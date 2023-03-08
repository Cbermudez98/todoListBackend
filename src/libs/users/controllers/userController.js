import { userCreateModel } from "../schemas/userCreate.schema.js";
import { Jwt } from "../../../middlewares/jwt.js";
import { Bcrypt } from "../../../utils/bcrypt.js";

export class UserController {
  constructor() {
    this.jwt = new Jwt();
    this.bcrypt = new Bcrypt();
  }

  async createUser(entity) {
    try {
      const found = await this.existEmail(entity.email);
      if (found) {
        throw {
          msg: "Email already exist",
          code: "UL001",
        };
      }
      const user = {
        ...entity,
        password: await this.bcrypt.encrypt(entity.password),
      };
      const userModel = userCreateModel(user);
      const saved = await userModel.save();
      return saved.id;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(entity, _id) {
    try {
      const found = await this.existEmail(entity.email);
      if (!found) {
        throw {
          msg: "User not found",
          code: "UL003",
        };
      }
      delete entity._id;
      await userCreateModel.findOneAndUpdate({ _id }, entity);
      return {
        msg: "User update with success",
      };
    } catch (error) {
      throw error;
    }
  }

  async getSingleUser(_id) {
    try {
      return await userCreateModel.findOne({ _id });
    } catch (error) {
      throw {
        msg: "User not found",
      };
    }
  }

  async login(entity) {
    try {
      const found = await this.existEmail(entity.email);
      if (!found) {
        throw {
          msg: "Not user was found",
          code: "UL002",
        };
      }
      const validatePassword = await this.bcrypt.compare(
        entity.password,
        found.password
      );
      if (!validatePassword) {
        throw {
          msg: "Password does not match",
          code: "UL003",
        };
      }
      const token = this.jwt.sign(entity.email);
      return { token, _id: found._id };
    } catch (error) {
      throw error;
    }
  }

  async existEmail(email) {
    return await userCreateModel.findOne({ email });
  }

  async renewJwt(email) {
    try {
      const found = await this.existEmail(email);
      if (!found) {
        throw {
          msg: "Not user was found",
          code: "UL002",
        };
      }

      const token = this.jwt.sign(email);
      return { token, _id: found._id };
    } catch (error) {
      throw error;
    }
  }
}
