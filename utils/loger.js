const bunyan = require("bunyan");

const env = process.env.NODE_ENV;
const bformat = require("bunyan-format");

const formatOut = bformat({
  outputMode: "long",
  color: true,
  stream: process.stdout,
});

const { LoggingBunyan } = require("@google-cloud/logging-bunyan");

const loggingBunyan = new LoggingBunyan();

const logger = bunyan.createLogger({
  // The JSON payload of the log as it appears in Stackdriver Logging
  // will contain "name": "my-service"
  name: "Mongodb assignment",
  streams: [
    // Log to the console at 'info' and above
    { stream: env ? process.stdout : formatOut, level: "debug" },
    // And log to Stackdriver Logging, logging at 'info' and above
    //loggingBunyan.stream("debug"),
  ],
});

class Logger {
  constructor(fnName, leadId, trace) {
    this.updateInfo(fnName, leadId, trace);
  }

  updateInfo(fnName, leadId, trace) {
    this.fnName = fnName;
    this.leadId = leadId;
    this.trace = trace;

    if (fnName || leadId || trace)
      this.info('BEGIN');
  }

  info(...msg) {
    let logMsg = '';
    if (this.fnName) {
      logMsg = `${this.fnName} | `;
    }

    if (this.leadId) {
      logMsg = `${logMsg} ${this.leadId} | `;
    }

    if (this.trace) {
      logMsg = `${logMsg} ${this.trace} | `;
    }

    msg[0] = `${logMsg} ${msg[0]}`;
    logger.info(...msg);
  }

  debug(...msg) {
    let logMsg = '';
    if (this.fnName) {
      logMsg = `${this.fnName} | `;
    }

    if (this.leadId) {
      logMsg = `${logMsg} ${this.leadId} | `;
    }

    if (this.trace) {
      logMsg = `${logMsg} ${this.trace} | `;
    }

    msg[0] = `${logMsg} ${msg[0]}`;
    logger.debug(...msg);
  }

  error(...msg) {
    let logMsg = '';
    if (this.fnName) {
      logMsg = `${this.fnName} | `;
    }

    if (this.leadId) {
      logMsg = `${logMsg} ${this.leadId} | `;
    }

    if (this.trace) {
      logMsg = `${logMsg} ${this.trace} | `;
    }

    msg[0] = `${logMsg} ${msg[0]}`;
    logger.error(...msg);
  }
}

module.exports = Logger;