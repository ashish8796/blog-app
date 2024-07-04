import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const userSignUpSchema = {
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

const userLoginSchema = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },

  required: ["email", "password"],
  additionalProperties: false,
};

const userUpdateSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    password: { type: "string" },
    role: { type: "string", enum: ["admin", "user"] },
  },
  additionalProperties: false,
};

export function validateSignUpUser(req, res, next) {
  const validate = ajv.compile(userSignUpSchema);

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

export function validateLoginUser(req, res, next) {
  const validate = ajv.compile(userLoginSchema);

  const isValid = validate(req.body);
  if (!isValid) {
    res.status(400).json({
      status: "error",
      message: "Bad Request",
      error: validate.errors,
    });
  }

  next();
}

export function validateUpdateUser(req, res, next) {
}
