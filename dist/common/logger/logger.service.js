"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const common_1 = require("@nestjs/common");
const winston = require("winston");
let AppLogger = class AppLogger {
    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
            defaultMeta: { service: 'budget-tracker-api' },
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(winston.format.colorize(), winston.format.simple())
                }),
                new winston.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                    format: winston.format.combine(winston.format.timestamp(), winston.format.json())
                }),
                new winston.transports.File({
                    filename: 'logs/combined.log',
                    format: winston.format.combine(winston.format.timestamp(), winston.format.json())
                }),
            ],
        });
    }
    log(message, context) {
        this.logger.info(message, { context: context || '' });
    }
    error(message, trace, context) {
        this.logger.error(message, {
            trace: trace || '',
            context: context || ''
        });
    }
    warn(message, context) {
        this.logger.warn(message, { context: context || '' });
    }
    debug(message, context) {
        this.logger.debug(message, { context: context || '' });
    }
    verbose(message, context) {
        this.logger.verbose(message, { context: context || '' });
    }
};
exports.AppLogger = AppLogger;
exports.AppLogger = AppLogger = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppLogger);
//# sourceMappingURL=logger.service.js.map