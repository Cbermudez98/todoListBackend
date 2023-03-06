import express from "express";
import { HttpResponse } from "../../shared/httpResponse.js";
import { UserController } from "./controllers/userController.js";


import { LoginInterface, UserCreateInterface } from "./interfaces/user.interface.js";
import { Jwt } from "../../middlewares/jwt.js";
import { EntityValidate } from "../../middlewares/EntityValidator.js";

export class User {
  constructor() {
    this.app = express();
    this.userController = new UserController();
    this.jwt = new Jwt();
    this.entityValidate = new EntityValidate();
  }

  userRoutes() {
    const { response } = new HttpResponse();
    this.app.post("/", this.entityValidate.apply(UserCreateInterface),(req, res) => {
      response(this.userController.createUser(req.body), req, res);
    });

    this.app.get("/:id", this.jwt.applyJwt(), (req, res) => {
        response(this.userController.getSingleUser(req.params.id), req, res);
    });

    this.app.patch("/update/:id", this.jwt.applyJwt(), this.entityValidate.apply(UserCreateInterface), (req, res) => {
        response(this.userController.updateUser(req.body, req.params.id), req, res);
    });

    this.app.post("/login", this.entityValidate.apply(LoginInterface),(req, res) => {
        response(this.userController.login(req.body), req, res);
    });
    return this.app;
  }
}
