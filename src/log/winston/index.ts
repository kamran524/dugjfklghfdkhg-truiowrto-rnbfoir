import winston from 'winston';
import {level} from './level';
import {levels} from './levels';
import {formatProduction, formatDevelopment} from './format';
import color from './color';
import WinstonTelegram from "winston-telegram";
import {config} from "dotenv";
import envConfig from "../../config/env.config";



config();

let format ;
winston.addColors(color);
const options : any = {
  token: envConfig.TELEGRAM_BOT_ID,
  chatId:envConfig.TELEGRAM_USER_CHAT_ID,
  level: "error"
}

if (process.env.NODE_ENV === "production"){format = formatProduction}else {format = formatDevelopment};


const transports = [
    // new WinstonTelegram(options),
    new winston.transports.Console(),
    new winston.transports.File({
        filename: './logs/error.log',
        maxsize: 5242880,
        handleExceptions: true,
        level: 'error',
    }),
    new winston.transports.File({ filename: './logs/all.log', maxsize: 5242880,level: 'debug' }),
]

const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports,
})

export default logger;

