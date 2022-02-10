import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

import { GlobalErrorHandler } from './global-error-handler';
import { LogTraceService } from './log-trace.service';
import { GlobalHttpInterceptorService } from './global-http-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    {
      // processes all errors
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: GlobalHttpInterceptorService, multi: true  
    },
    LogTraceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
