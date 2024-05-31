import { Request, NextFunction, Response } from "express";
import service from './submissions_service'
import { STATUS_MSG } from "../../constant/constant";

export const findAll = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    const { db } = req.app.locals;
    try {
      const data = await service.findAll(db, req.user, req.params.id);
      res.status(200).send({ status: 200, data, message: STATUS_MSG.FIND })
    } catch (e) {
      next(e);
    }
  };

  export const create = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    const { db, client } = req.app.locals;
    try {
      const data = await service.create(db, client, req.user, req.body);
      res.status(200).send({ status: 200, data, message: STATUS_MSG.CREATE })
    } catch (e) {
      next(e);
    }
  };