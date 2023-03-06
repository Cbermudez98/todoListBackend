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
                code: "UL003"
            }
        }
        delete entity._id;
        await userCreateModel.findOneAndUpdate({_id}, entity);
        return {
            msg: "User update with success"
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
  }

  async getSingleUser(_id) {
    try {
        return await userCreateModel.findOne({_id});
    } catch (error) {
        throw {
            msg: "User not found"
        }
    }
  }

  async login(entity) {
    try {
      const found = await this.existEmail(entity.email);
      if (found) {
        const token = this.jwt.sign(entity.email);
        return token;
      }
      throw {
        msg: "Not user was found",
        code: "UL002",
      };
    } catch (error) {
      throw error;
    }
  }

  async existEmail(email) {
    return await userCreateModel.findOne({ email });
  }
}
