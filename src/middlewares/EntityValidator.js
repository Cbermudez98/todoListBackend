// import { validate } from "express-validation";
import ajv from "ajv";
export class EntityValidate {
  constructor() {
    this.ajv = new ajv();
  }

  apply(entity) {
    return (req, res, next) => {
      const validate = this.ajv.compile(entity);
      if (!validate(req.body)) {
        return res.status(400).send({
          msg: "Bad request",
        });
      }
      next();
    };
  }
}
