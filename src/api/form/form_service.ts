import { Db, ObjectId } from "mongodb";
import { COL } from "../../constant/constant";
import ApiError from "../../utils/ApiError";
import { ObjectIdWithErrorHandler } from "../../helpers/helper";

const findAll = async (db: Db, user: any) => {
  const data = await db
    .collection(COL.form)
    .find({ userId: user?._id })
    .sort({ _id: -1 })
    .toArray();
  return data;
};

const create = async (db: Db, user: any, payload: any) => {
  const checkDuplicate = await db.collection(COL.form).findOne({userId: user?._id,name: payload?.name});
  if(checkDuplicate) throw new ApiError(409, "Form with this name already exists")
  const data = await db.collection(COL.form).insertOne({
    ...payload,
    userId: user?._id,
    shareUrl: new ObjectId(),
    createdAt: new Date(),
  });
  return data;
};

const update = async (db: Db, user: any, payload: any) => {
  const id = new ObjectId(payload?.id as string);
  delete payload?.id;
  const data = await db.collection(COL.form).updateOne(
    { _id: id, userId: user?._id },
    {
      $set: {
        ...payload,
        updatedAt: new Date(),
      },
    }
  );
  return data;
};

const remove = async (db: Db, user: any, payload: any) =>{
  const formId = ObjectIdWithErrorHandler(payload?._id);
  await db.collection(COL.form).deleteOne({_id: formId, userId: user?._id});
  return 'deleted'
}

const findOne = async (db: Db, user: any, formId: string) => {
  const id = new ObjectId(formId);
  const data = await db
    .collection(COL.form)
    .findOne({ userId: user?._id, _id: id });
  return data;
};

const getFormStats = async (db: Db, user: any) => {
  const aggregate = [
    {
      $match: {
        userId: user?._id,
      },
    },
    {
      $group: {
        _id: null,
        visits: { $sum: "$visits" },
        submissions: { $sum: "$submissions" },
      },
    },
  ];
  const data = (await db
    .collection(COL.form)
    .aggregate(aggregate)
    .toArray()) || [{}];
  if (!data.length) {
    return {
      visits: 0,
      submissions: 0,
      submissionRate: 0,
      bounceRate: 0,
    };
  }

  const { visits = 0, submissions = 0 } = data[0];

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;
  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
};

const getFormContent = async (db: Db, user: any, shareId: string) => {
  const id = new ObjectId(shareId);
  const data = await db
    .collection(COL.form)
    .findOneAndUpdate(

      { shareUrl: id },
      { $inc: { 'visits': 1 } },
      { returnDocument: 'after' }
    );

  return data;
};

export default {
  findAll,
  create,
  update,
  findOne,
  remove,
  getFormStats,
  getFormContent,
};
