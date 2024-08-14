import Joi from 'joi';

const authSchemaBase = {
  email: Joi.string().email().required().messages({
    'string.base': 'Email should me a string',
    'string.email': 'Email should have email structure',
    'any.required': 'Email is required',
    'string.empty': "Email shouldn't be empty",
  }),
  password: Joi.string().required().messages({
    'string.base': 'Password should me a string',
    'any.required': 'Password is required',
    'string.empty': "Password shouldn't be empty",
  }),
};

export const registerUserSchema = Joi.object({
  ...authSchemaBase,
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should me a string',
    'string.min': 'Name should have at least 3 characters',
    'string.max': 'Name should have 30 characters at max',
    'any.required': 'Name is required',
    'string.empty': "Name shouldn't be empty",
  }),
});

export const loginUserSchema = Joi.object(authSchemaBase);