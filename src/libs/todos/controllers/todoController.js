import { userCreateModel } from "../../users/schemas/userCreate.schema.js";
import { TodoModel } from "../schemas/todoSchema.schema.js";
import mongoose from "mongoose";

export class TodoController {
  constructor() {}

  async createTodo(entity, _id) {
    try {
      const userStored = await userCreateModel.findOne({ _id });
      if (!userStored) {
        throw {
            msg: "User not exist",
            code: "TD002"
        }
      }
      entity.idOwner = new mongoose.Types.ObjectId(_id);
      const todoModel = TodoModel(entity);
      const saved = await todoModel.save();
      return { _id: saved._id };
    } catch (error) {
        throw {
            msg: error?.msg || "Error saving todo",
            code: error?.code || "TD001"
        }
    }
  }

  async updateTodo(entity, _id) {
    try {
        const idOwner = entity.idOwner;
        delete entity.idOwner;
        const stored = await TodoModel.findOneAndUpdate({_id, idOwner}, entity);
        if (!stored) {
            throw {
                msg: "Todo was not found",
                code: "TD004"
            };
        }
        return { msg: "Update with success" };
    } catch (error) {
        throw {
            msg: error?.msg || "Error updating todo",
            code: error?.code || "TD003"
        }
    }
  }

  async deleteTodo(_id, idOwner) {
    try {
        const deleted = await TodoModel.findOneAndDelete({_id, idOwner});
        if (!deleted) {
            throw {
                code: "TD004",
                msg: "Todo not found"
            }
        }
    } catch (error) {
        throw {
            msg: error?.msg || "Error Deleting todo",
            code: error?.code || "TD005"
        }
    }
  }
}
