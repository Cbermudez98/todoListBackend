import express from "express";
import { Jwt } from "../../middlewares/jwt.js";
import { EntityValidate } from "../../middlewares/EntityValidator.js";
import { TodoCreateInterface, TodoUpdateInterface } from "./interfaces/todoCreateInterface.js";
import { HttpResponse } from "../../shared/httpResponse.js";
import { TodoController } from "./controllers/todoController.js";

export class Todo {
    constructor() {
        this.app = express();
        this.entityValidate = new EntityValidate();
        this.todoController = new TodoController();
        this.jwt = new Jwt();
    }

    todoRoutes() {
        const { response } = new HttpResponse();
        this.app.post("/:id", this.jwt.applyJwt(), this.entityValidate.apply(TodoCreateInterface), (req, res) => {
            response(this.todoController.createTodo(req.body, req.params.id), req, res);
        });
        this.app.patch("/:id", this.jwt.applyJwt(), this.entityValidate.apply(TodoUpdateInterface), (req, res) => {
            response(this.todoController.updateTodo(req.body, req.params.id), req, res);
        });
        this.app.delete("/:id/:idOwner", this.jwt.applyJwt(), (req, res) => {
            response(this.todoController.deleteTodo(req.params.id, req.params.idOwner), req, res);
        });
        this.app.get("/all/:id", this.jwt.applyJwt(), (req, res) => {
            response(this.todoController.getAll(req.params.id), req, res);
        });
        this.app.get("/:idOwner/:_id", this.jwt.applyJwt(), (req, res) => {
            response(this.todoController.getSingle(req.params.idOwner, req.params._id), req, res);
        });
        return this.app;
    }
}