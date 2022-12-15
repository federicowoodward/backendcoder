import log4js from "log4js";
import config from "../../config/config.js";

log4js.configure({
    appenders: {
        myConsole: { type: `console` },
        warnFile: { type: `file`, filename: `warn.log` },
        errorFile: { type: `file`, filename: `error.log` },
        logWarn: { 
            type: `logLevelFilter`, 
            appender: "warnFile", 
            level: `warn`,
        },
        logError: { 
            type: `logLevelFilter`, 
            appender: `errorFile`, 
            level: `error`,
        },
        logConsole: {
            type: `logLevelFilter`, 
            appender: "myConsole",  
            level: "all" 
        }
    },
    categories: {
        default: { appenders: [`myConsole`], level: `all` },
        prod: { appenders: [`logWarn`,`logError`,`logConsole`], level: `all` },
    },
})

let logger 

if(config.MODO===`PROD`) {
    logger = log4js.getLogger(`prod`);
} else {
    logger = log4js.getLogger()
}

export default logger