const fs = require("fs");
const path = require("path");
const dayjs = require("dayjs");
const morganBody = require("morgan-body");

const now = dayjs();

const formattedDate = now.format("YYYY-MM-DD HH");
const logsDir = path.join(__dirname, "../../log");

// Create logs directory if it does not exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const requestLogStream = fs.createWriteStream(
  path.join(logsDir, `${formattedDate}-request.log`),
  { flags: "a" }
);

const errorLogStream = fs.createWriteStream(
  path.join(logsDir, `${formattedDate}-error.log`),
  {
    flags: "a",
  }
);

morganBody(
  {
    noColors: true,
    stream: requestLogStream,
    logReqUserAgent: false,
    logRequestBody: false,
  },
  {
    stream: errorLogStream,
  }
);

module.exports = { requestLogStream, errorLogStream };
