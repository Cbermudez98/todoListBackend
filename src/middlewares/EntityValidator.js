import { validate } from "express-validation";

export class EntityValidate {
  constructor() {}

  apply() {
    return (err, req, res, next) => {
      if (err instanceof ValidationError) {
        return res.status(400).send({
          msg: "Bad request",
        });
      }

      return res.status(400).send({
        msg: "Bad request",
      });
    };
  }
}
