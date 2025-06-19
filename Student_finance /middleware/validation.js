const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).max(100).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required()
});

module.exports = {
  validateRegister: (req, res, next) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: error.details.map(d => d.message).join(', ') });
    next();
  },
  validateLogin: (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(400).json({ message: error.details.map(d => d.message).join(', ') });
    next();
  }
};