import Ajv from "ajv";
import { NextFunction, Response } from "express";
import { UpdatedRequest } from "../interfaces/common.interface";
import ApiError from "../utils/ApiError";
const ajv = new Ajv({ allErrors: true });
const staticSchemaValidation = (schema: any) => {
  return async (
    req: UpdatedRequest | any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validate = ajv.compile(schema);
      const valid = validate(req.body);
      if (!valid) {
        throw new ApiError(405, "Schema Error");
      }
      return next();
    } catch (e) {
      next(e);
    }
  };
};

export default staticSchemaValidation;
