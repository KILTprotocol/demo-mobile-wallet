"use strict";
/**
 * Config is used to configure logging.
 * @module Config
 * @preferred
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dummy comment needed for correct doc display, do not remove
 */
const typescript_logging_1 = require("typescript-logging");
// Create options instance and specify 2 LogGroupRules:
// * One for any logger with a name starting with model, to log on debug
// * The second one for anything else to log on info
const options = new typescript_logging_1.LoggerFactoryOptions().addLogGroupRule(
  new typescript_logging_1.LogGroupRule(
    new RegExp(".+"),
    typescript_logging_1.LogLevel.Debug
  )
);
// Create a named loggerfactory and pass in the options and export the factory.
// Named is since version 0.2.+ (it's recommended for future usage)
// eslint-disable-next-line import/prefer-default-export
exports.factory = typescript_logging_1.LFService.createNamedLoggerFactory(
  "LoggerFactory2",
  options
);
//# sourceMappingURL=ConfigLog.js.map
