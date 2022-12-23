import {format} from 'winston'
import moment from 'moment'

const colorize = format.colorize();

const timeFormat = format.timestamp({
    format: moment().format('YYYY-MM-DD HH:mm:ss')
});

export const formatProduction = format.combine(timeFormat, format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(2)}] - ${info.message}`
}));


export const formatDevelopment = format.combine(timeFormat, format.printf((info) => {
    return colorize.colorize(info.level, `${info.timestamp} - [${info.level.toUpperCase().padEnd(2)}] - ${info.message}`)
}));
