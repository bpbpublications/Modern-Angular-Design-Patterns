import { Injectable } from '@angular/core';

interface ILogger {
  log(message: string): void;
}

class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`[console] ${message}`);
  }
}

class FileLogger implements ILogger {
  log(message: string): void {
    console.log(`[file] ${message} (appended to log file)`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoggerFactory {
  createLogger(type: 'console' | 'file'): ILogger {
    return type === 'console' ? new ConsoleLogger() : new FileLogger();
  }
}
