import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogTraceService {

  public traces: any[] = [];

  constructor() { }

  addTrace(trace: any) {
    this.traces.push(trace);
  }
}

export interface ErrorTrace {
  description?: string;
  fileName?: string;
  lineNumber?: number;
  trace?: any;
  timeStamp?: string;
  organizationSelected?: string;
  loggedUser?: string;
  functionName?: string;
  level?: string;
}
