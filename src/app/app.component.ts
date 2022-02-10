import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LogTraceService } from './log-trace.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(public logTraceService: LogTraceService, private http: HttpClient) {

  }

  error1() {
    throw new Error('Error 01');
  } 
  error2() {
    throw new Error('Error 02');
  } 
  error3() {
    throw new Error('Error 03');
  }
  errorHttp() {

    // Http errors need to be handled in the http interceptor, but seems hard to get where the 
    // call was made from

    // https://api.zippopotam.us/us/33162
    this.http.get(`https://api.zippopotam.us/us/asd`).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

}
