import { Schema, model, ObjectId } from "mongoose";

export const TodoSchema = new Schema({
    title: String,
    description: String,
    done: Boolean,
    idOwner: ObjectId
}, { versionKey: false, timestamps: true });

export const TodoModel = new model("todo", TodoSchema);
