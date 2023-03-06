import express from "express";

export class Todo {
    constructor() {
        this.app = express();
    }

    todoRoutes() {
        return this.app;
    }
}