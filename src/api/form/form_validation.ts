export const createFormValidation = {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      description: {
        type: "string",
      },
    },
    required: ["name", "description"],
    additionalProperties: false,
}

export const updateFormValidation = {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      content: {
        type: "string",
      },
      published: {
        type: "boolean"
      }
    },
    required: ["id"],
    additionalProperties: false,
}

export const deleteValidation = {
  type: "object",
  properties: {
    _id: {
        type: "string",
    }
  },
  required: ["_id"],
    additionalProperties: false,
}