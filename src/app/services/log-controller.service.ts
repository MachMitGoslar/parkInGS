import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';




export interface LogEntry {
  id: number,
  code: StatusCode
  msg: String,
  logLevel: LogLevel
}

export enum LogLevel {
  Info = "info",
  Success = "success",
  Warning = "warning",
  Danger = "danger"
}

export enum StatusCode {
  NotFound = 404,
  BadRequest = 400,
  ServerError = 500,
  Success = 200,
  SmthElse = 0,

}
@Injectable({
  providedIn: 'root'
})

export class LogControllerService {

  private log_stack: LogEntry[] = [];
  public logs: ReplaySubject<LogEntry[]> = new ReplaySubject(1);

  constructor() { 
    this.logs.next(this.log_stack);
  }

  addLog(msg: string, logLevel = LogLevel.Warning, code = StatusCode.SmthElse ) {
    this.log_stack.push({
      id: this.log_stack.length,
      msg: msg,
      logLevel: logLevel,
      code: code
    })
    this.logs.next(this.log_stack)
  }

  removeLog(id: number): void {
    this.log_stack.splice(id, 1);
    this.logs.next(this.log_stack);
  }
}
