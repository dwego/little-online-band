const logger = require("../utils/logger");

const addLoggerToRequest = (req, res, next) => {
  req.logger = logger;
  next();
};

module.exports = { addLoggerToRequest };
