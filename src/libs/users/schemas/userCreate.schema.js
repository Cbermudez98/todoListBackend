import { Schema, model } from "mongoose";

export const userCreateSchema = new Schema({
    name: String,
    lastName: String,
    email: String,
    password: String
}, { versionKey: false, timestamps: true });

export const userCreateModel = new model("user", userCreateSchema);