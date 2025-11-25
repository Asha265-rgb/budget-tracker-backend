import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class AppLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service: 'budget-tracker-api' }, // ✅ FIXED TYPO
      transports: [
        // Console output for development
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          )
        }),
        // File output for errors
        new winston.transports.File({ 
          filename: 'logs/error.log', 
          level: 'error',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        }),
        // File output for all logs
        new winston.transports.File({ 
          filename: 'logs/combined.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
          )
        }),
      ],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context: context || '' });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { 
      trace: trace || '', 
      context: context || '' 
    });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context: context || '' });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context: context || '' });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context: context || '' });
  }
}