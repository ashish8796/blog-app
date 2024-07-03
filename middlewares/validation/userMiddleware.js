import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
    },
    role: {
      type: "string",
      enum: ["admin", "user"],
    },
  },

  required: ["email", "password", "role"],
  additionalProperties: false,
};

export default function validateUserSchema(req, res, next) {
  const validate = ajv.compile(userSchema);

  const isValid = validate(req.body);
  if (!isValid) {
    return res.status(400).json({
      status: "error",
      message: "Bad Request",
      errors: validate.errors,
    });
  }

  next();
}
