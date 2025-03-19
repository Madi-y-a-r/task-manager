
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

class Logger {
  private logToConsole(entry: LogEntry) {
    const { level, message, timestamp, data } = entry;
    
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    switch (level) {
      case 'info':
        console.info(logMessage, data || '');
        break;
      case 'warn':
        console.warn(logMessage, data || '');
        break;
      case 'error':
        console.error(logMessage, data || '');
        break;
      case 'debug':
        console.debug(logMessage, data || '');
        break;
    }
  }

  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data
    };
  }

  info(message: string, data?: any) {
    const entry = this.createLogEntry('info', message, data);
    this.logToConsole(entry);
    // Here you could also save logs to a database or external service
  }

  warn(message: string, data?: any) {
    const entry = this.createLogEntry('warn', message, data);
    this.logToConsole(entry);
  }

  error(message: string, data?: any) {
    const entry = this.createLogEntry('error', message, data);
    this.logToConsole(entry);
  }

  debug(message: string, data?: any) {
    // Only log debug in development
    if (process.env.NODE_ENV !== 'production') {
      const entry = this.createLogEntry('debug', message, data);
      this.logToConsole(entry);
    }
  }
}

export const logger = new Logger();