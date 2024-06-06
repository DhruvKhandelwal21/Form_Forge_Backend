export const createUserValidation = {
    type: "object",
    properties: {
      userName: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
    required: ["userName", "email", "password"],
    additionalProperties: false,
}

export const loginUserValidation = {
    type: "object",
    properties: {
      userName: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
    required: ["password"],
    oneOf: [
        { required: ["userName"] },
        { required: ["email"] },
      ],
    additionalProperties: false,
}