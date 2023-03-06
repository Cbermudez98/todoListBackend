import express from "express";
import { config } from "dotenv";

import { User } from "./src/libs/users/index.js";
import { Todo } from "./src/libs/todos/index.js";

import { Database } from "./src/config/mongoose.js";

export class Index {
    constructor() {
        config();
        new Database().initDatabase();
        this.app = express();
        this.app.set("port", process.env?.PORT || 8080);
        this.app.use(express.json());
        this.app.use("/user", new User().userRoutes());
        this.app.use("/todo", new Todo().todoRoutes());
    }

    initServer() {
        this.app.listen(this.app.get("port"), () => {
            console.log(`Server running at port ${this.app.get("port")}`)
        });
    }
}

const server = new Index();
server.initServer();