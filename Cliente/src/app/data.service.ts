import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import { Customer } from './customer';
import {AuthenticationService} from "./authentication.service";
import {Credencial} from "./credencial";



@Injectable()
export class DataService {

  private customersUrl = 'usuarios';  // URL to web API
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private authenticationService: AuthenticationService) {}

  // get credentials
  getCredentials(): Observable<Credencial[]> {
    // add authorization header with jwt token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    // get users from api
    return this.http.get('/login', options)
      .map((response: Response) => response.json());
  }
  // Get all customers
  getCustomers(): Promise<Customer[]> {
    return this.http.get(this.customersUrl)
      .toPromise()
      .then(response => response.json() as Customer[])
      .catch(this.handleError);
  }

    create(customer: Customer): Promise<Customer> {
    return this.http
      .post("usuarios", JSON.stringify(customer), {headers : this.headers})
      .toPromise()
      .then(res => res.json() as Customer)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.customersUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
