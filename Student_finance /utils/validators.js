const Joi = require('joi');

const userSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string().trim().max(100).allow(null, ''),
  last_name: Joi.string().trim().max(100).allow(null, '')
});

const transactionSchema = Joi.object({
  description: Joi.string().trim().max(255).required(),
  amount: Joi.number().positive().precision(2).required(),
  category: Joi.when('type', {
    is: 'income',
    then: Joi.valid('income'),
    otherwise: Joi.valid('food', 'textbooks', 'transportation', 'entertainment', 'accommodation', 'healthcare', 'clothing', 'miscellaneous')
  }),
  type: Joi.string().valid('income', 'expense').required(),
  date: Joi.date().required()
});

const budgetSchema = Joi.object({
  category: Joi.string().valid('food', 'textbooks', 'transportation', 'entertainment', 'accommodation', 'healthcare', 'clothing', 'miscellaneous').required(),
  limit_amount: Joi.number().positive().precision(2).required(),
  month: Joi.string().pattern(/^\d{4}-\d{2}$/).required().messages({
    'string.pattern.base': 'Month must be in YYYY-MM format'
  })
});

const savingsSchema = Joi.object({
  account_name: Joi.string().trim().max(100).required(),
  total_amount: Joi.number().positive().precision(2).required(),
  target_amount: Joi.number().positive().precision(2).allow(null)
});

module.exports = {
  validateUser: (data) => userSchema.validate(data, { abortEarly: false }),
  validateTransaction: (data) => transactionSchema.validate(data, { abortEarly: false }),
  validateBudget: (data) => budgetSchema.validate(data, { abortEarly: false }),
  validateSavings: (data) => savingsSchema.validate(data, { abortEarly: false })
};
