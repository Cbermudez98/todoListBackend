import { Joi } from "express-validation";

export const UserCreateInterface = {
    body: Joi.object({
        _id: Joi.string(),
        name: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};

export const LoginInterface = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
};