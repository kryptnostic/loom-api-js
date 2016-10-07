/*
 * @flow
 */

import log from 'loglevel';
import moment from 'moment';

import * as _ from 'lodash';

declare var __DEV__;

const LOG_LEVELS = {
  TRACE: 'trace',
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

const TIMESTAMP_FORMAT = 'YYYY-MM-DD HH:mm:ss';

if (__DEV__) {
  log.setLevel(log.levels.TRACE);
}
else {
  log.setLevel(log.levels.INFO);
}

function isNonEmptyString(value :any) {

  return _.isString(value) && !_.isEmpty(value);
}

function getMessagePrefix(loggerLevel, loggerName) {

  return `[${moment().format(TIMESTAMP_FORMAT)} ${loggerLevel.toUpperCase()} ${loggerName}]`;
}

export default class Logger {

  name :string;
  logger :Object;

  constructor(name :string) {

    this.name = name;
    this.logger = log.getLogger(name);
  }

  log(logLevel :string, message :any, ...args :Array<any>) {

    const messagePrefix = getMessagePrefix(logLevel, this.name);

    if (isNonEmptyString(message)) {
      this.logger[logLevel](`${messagePrefix} - ${message}`);
    }
    else {
      this.logger[logLevel](messagePrefix);
      if (logLevel !== LOG_LEVELS.TRACE) {
        if (_.isError(message) || !_.isEmpty(message)) {
          this.logger[logLevel](message);
        }
      }
    }

    if (args.length > 0) {
      this.logger[logLevel](...args);
    }
  }

  trace(message :any) {

    this.log(LOG_LEVELS.TRACE, message);
  }

  debug(message :any, ...args :Array<any>) {

    this.log(LOG_LEVELS.DEBUG, message, ...args);
  }

  info(message :any, ...args :Array<any>) {

    this.log(LOG_LEVELS.INFO, message, ...args);
  }

  warn(message :any, ...args :Array<any>) {

    this.log(LOG_LEVELS.WARN, message, ...args);
  }

  error(message :any, ...args :Array<any>) {

    this.log(LOG_LEVELS.ERROR, message, ...args);
  }
}
