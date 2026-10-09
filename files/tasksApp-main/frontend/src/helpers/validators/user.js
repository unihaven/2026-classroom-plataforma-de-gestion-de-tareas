import Joi from "joi";

export const validateLogin = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(/[a-z]/, { name: "lowercase" })
    .message("Must contain at least one lowercase letter")
    .pattern(/[A-Z]/)
    .message("Must contain at least one uppercase letter")
    .pattern(/\d/)
    .message("Must contain at least one number")
    .pattern(/[!@#$%^&*]/)
    .message(
      "Must contain at least one special character, e.g. ( !, @, #, $, %, ^, &, * )",
    )
    .min(8)
    .required(),
});

export const validateRegister = Joi.object({
  name: Joi.string()
    .min(3)
    .message("Name must be at least 3 characters long")
    .alphanum()
    .message("Name must be alphanumeric")
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(/[a-z]/, { name: "lowercase" })
    .message("Must contain at least one lowercase letter")
    .pattern(/[A-Z]/, { name: "uppercase" })
    .message("Must contain at least one uppercase letter")
    .pattern(/\d/, { name: "number" })
    .message("Must contain at least one number")
    .pattern(/[!@#$%^&*]/, { name: "special character" })
    .message(
      "Must contain at least one special character, e.g. ( !, @, #, $, %, ^, &, * )",
    )
    .min(8)
    .required(),
});
