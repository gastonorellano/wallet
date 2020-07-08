import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account, Balance, Quotation } from '../shared/account';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  // Define API
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAccount(id: string): Observable<Account> {
    return this.http
      .get<Account>(this.apiURL + '/account/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  getBalance(id: string): Observable<Balance> {
    return this.http
      .get<Balance>(this.apiURL + '/balance/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCotizacion(): Observable<Quotation> {
    return this.http
      .get<Quotation>(this.apiURL + '/Quotation')
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
