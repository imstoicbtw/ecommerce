import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import zodValidate from "../../../common/dist/utils/zod-validate.util.js";


export function validateBody (schema: ZodTypeAny) {
    return function (req: Request, _res: Response, next: NextFunction) {
        req.body = zodValidate(req.body, schema);
        next();
    };
}