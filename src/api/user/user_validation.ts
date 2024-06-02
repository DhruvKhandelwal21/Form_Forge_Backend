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
      confirmPassword: {
        type: "string",
      }
    },
    required: ["userName", "email", "password", "confirmPassword"],
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