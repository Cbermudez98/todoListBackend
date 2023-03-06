import mongoose from "mongoose";

export class Database {
    constructor() {}

    initDatabase() {
        mongoose.connect(process.env?.DATABASE_URI)
            .then(() => console.log("Database connected"))
            .catch((error) => console.error(error));
    }
}