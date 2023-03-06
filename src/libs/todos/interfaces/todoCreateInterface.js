export const TodoCreateInterface = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        done: { type: "boolean" },
        idOwner: { type: "string" }
    },
    required: ["title", "description", "done"],
    additionalProperties: false
};

export const TodoUpdateInterface = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        done: { type: "boolean" },
        idOwner: { type: "string" }
    },
    additionalProperties: false
};