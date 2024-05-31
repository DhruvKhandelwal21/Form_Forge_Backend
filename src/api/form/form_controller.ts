import { Request, NextFunction, Response } from "express";
import service from './form_service'
import { STATUS_MSG } from "../../constant/constant";

export const findAll = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    const { db } = req.app.locals;
    try {
      const data = await service.findAll(db, req.user);
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
    const { db } = req.app.locals;
    try {
      const data = await service.create(db, req.user, req.body);
      res.status(200).send({ status: 200, data, message: STATUS_MSG.CREATE })
    } catch (e) {
      next(e);
    }
  };

  export const update = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    const { db } = req.app.locals;
    try {
      const data = await service.update(db, req.user, req.body);
      res.status(200).send({ status: 200, data, message: STATUS_MSG.UPDATE })
    } catch (e) {
      next(e);
    }
  };

  export const findOne = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    const { db } = req.app.locals;
    try {
      const data = await service.findOne(db, req.user, req.params.id);
      res.status(200).send({ status: 200, data, message: STATUS_MSG.FIND })
    } catch (e) {
      next(e);
    }
  };
  export const remove = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    const { db } = req.app.locals;
    try {
      const data = await service.remove(db, req.user, req.body);
      res.status(200).send({ status: 200, data, message: STATUS_MSG.DELETE });
    } catch (e) {
      next(e);
    }
  };

  export const getFormStats = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    const { db } = req.app.locals;
    try {
      const data = await service.getFormStats(db, req.user );
      res.status(200).send({ status: 200, data, message: STATUS_MSG.FIND })
    } catch (e) {
      next(e);
    }
  };

  export const getFormContent = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    const { db } = req.app.locals;
    try {
      const data = await service.getFormContent(db, req.user, req.params.shareId);
      res.status(200).send({ status: 200, data, message: STATUS_MSG.FIND })
    } catch (e) {
      next(e);
    }
  };