const logger = require('pino')(); // Assume pino for logging, install if needed

module.exports = (err, req, res, next) => {
  logger.error({ err, path: req.path }, 'Error occurred');
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal server error' });
};