import { Schema, model } from "mongoose";
const ObjectId = Schema.ObjectId;

export const userCreateSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    password: String
}, { versionKey: false, timestamps: true });

export const userCreateModel = new model("user", userCreateSchema);