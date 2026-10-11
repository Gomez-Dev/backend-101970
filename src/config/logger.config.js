import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { config } from "./env.config.js";

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
  },
};

winston.addColors(customLevels.colors);

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `${timestamp} [${level}] ${message}`;
  }),
);

const isProduction = config.nodeEnv === "production";

const logger = winston.createLogger({
  levels: customLevels.levels,
  level: isProduction ? "info" : "debug",
  format: logFormat,
  transports: [
    new winston.transports.Console({
      level: isProduction ? "info" : "debug",
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        logFormat,
      ),
    }),

    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "10m",
      maxFiles: "14d",
      level: "debug",
    }),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      maxsize: 10 * 1024 * 1024,
    }),

    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "10m",
      maxFiles: "14d",
      level: "error",
    }),
  ],
});

export default logger;
