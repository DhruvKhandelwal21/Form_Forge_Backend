import { Db, ObjectId, MongoClient } from "mongodb";
import { COL } from "../../constant/constant";
import ApiError from "../../utils/ApiError";

const findAll = async (db: Db, user: any, formId:string) => {
    
    const id = new ObjectId(formId);
    const data = await db.collection(COL.submissions).find({ formId: id }).sort({_id:-1}).toArray();
    return data;
  };
  
  const create = async (db: Db, client: any, user: any, payload: any) => {
    const session = client.startSession();
  
    try {
      await session.withTransaction(async () => {
        
        const id: string = payload.formId;
        delete payload.formId;
        const formId = new ObjectId(id);

        const alreadySubmitted = await db.collection(COL.submissions).findOne({userId: user?._id, formId: formId});
        if(alreadySubmitted) throw new ApiError(409, "User already submitted the data")
        
        const data = await db.collection(COL.submissions).insertOne({
          ...payload,
          userId: user?._id,
          formId: formId,
          createdAt: new Date(),
        }, { session });
  
        await db.collection(COL.form).findOneAndUpdate(
          {
            _id: formId,
          },
          {
            $inc: {
              submissions: 1,
            },
          },
          {
            upsert: false,
          }
        );
  
        return data;
      });
    } catch (error) {
      console.error("Transaction aborted due to error:", error);
      throw error;  // Ensure error is propagated after logging
    } finally {
      await session.endSession();
    }
    // 
    // const id: string = payload.formId;
    // delete payload.formId;
    // const formId = new ObjectId(id);
    // const data = await db.collection(COL.submissions).insertOne({
    //   ...payload,
    //   userId: userId,
    //   formId: formId,
    //   createdAt: new Date(),
    // });

    //   await db.collection(COL.form).findOneAndUpdate(
    //     {
    //       userId: userId,
    //       formId: formId,
    //     },
    //     {
    //       $set: {
    //         submissions: { $ifNull: [{ $add: ["$submissions", 1] }, 1] },
    //       },
    //     },
    //     {
    //       upsert: false,
    //     }
    //   );
  
    // return data;
  };

  export default {
     findAll,
     create
  }
  