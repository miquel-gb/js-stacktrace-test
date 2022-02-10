import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, ErrorHandler } from "@angular/core";
import * as StackTrace from "stacktrace-js";
import * as StackTraceGPS from 'stacktrace-gps';
import { ErrorTrace, LogTraceService } from "./log-trace.service";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private logTraceService: LogTraceService, private http: HttpClient) {}

    handleError(error: any) {

        if (error instanceof HttpErrorResponse) {
            console.log(error);
            // TODO: Need to handle the http error response
        } else {
            let errorTrace: ErrorTrace = {};
            errorTrace.timeStamp = new Date().toLocaleString();
            errorTrace.loggedUser = 'mail@mail.com';
            errorTrace.organizationSelected = 'SelectedOrganization'
            errorTrace.description = error.message;
            errorTrace.level = 'ERROR'; // If FATAL => Instant bulk

            StackTrace.fromError(error).then(
                (stackTrace) => {
                    errorTrace.fileName = stackTrace[0].fileName;
                    errorTrace.lineNumber = stackTrace[0].lineNumber;
                    errorTrace.functionName = stackTrace[0].functionName;
                    var stringifiedStack = stackTrace.map((sf) => {
                        return sf.toString();
                    }).join('\n');
                    errorTrace.trace = stringifiedStack;
                    this.logTraceService.addTrace(errorTrace);

                    const body = errorTrace;

                    this.http.post(
                        'http://localhost:3000/elastic/add-log',
                        body
                    ).subscribe(
                        (response) => {
                            console.log(response);
                        },
                        (error) => {
                            console.log(error);
                        }
                    )

                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            );
        }
    }
}