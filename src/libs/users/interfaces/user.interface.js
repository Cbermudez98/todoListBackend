export const UserCreateInterface = {
    type: "object",
    properties: {
        _id: { type: "string" },
        name: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
        password: { type: "string" }
    },
    required: ["name", "lastName", "email", "password"],
    additionalProperties: false
};

export const LoginInterface = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string" }
    },
    required: ["email", "password"],
    additionalProperties: false
};