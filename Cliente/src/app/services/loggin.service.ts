import { Injectable } from '@angular/core';


import { Http, Headers, Response,RequestOptions } from '@angular/http';
import { Observable} from "rxjs";
import { HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map'


@Injectable()
export class LogginService {

   token = 'dce86dc6-28c4-43c7-979f-389a4ba7e814';
  loggedIn: Boolean = false;
  header = new Headers({'Content-Type': 'application/json'});
  private options = new RequestOptions({ headers: this.header });


  proToken = new HttpHeaders().set('Authorization', 'my-auth-token');


  constructor(private http: Http) {

   // this.loggedIn = !! localStorage.getItem('auth_token');
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //this.token = currentUser && currentUser.token;

  }

  getToken(){
    return this.token;
  }

  login(login, senha){
    console.log(JSON.stringify({login: login, senha: senha}));
    console.log(this.token);
    return this.http.post( 'acesso', JSON.stringify({login: login, senha: senha}), this.options
    ).map((response: Response) =>  {
      //let resposta  = response.data;
      let status = response.status.valueOf();


      //let token = response.json().subscribe(response => this.token = response.data);
      console.log(this.getToken());
      if (status === 200) {
        this.loggedIn = true;
        // set token property
        //this.token = token;

        // store username and jwt token in local storage to keep user logged in between page refreshes
        //localStorage.setItem('currentUser', JSON.stringify({ login: login, token: token }));

        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        return false;
      }

    });


  }





  /*
 login(login, senha){
    console.log(JSON.stringify({login: login, senha: senha}));
    console.log(this.token);
    return this.http.post( 'acesso', JSON.stringify({login: login, senha: senha}), this.options
    ).map((response: Response) =>  {
      //let resposta  = response.data;
      let status = response.status.valueOf();


      //let token = response.json().subscribe(response => this.token = response.data);
      console.log(this.getToken());
      if (status === 200) {
        this.loggedIn = true;
        // set token property
        //this.token = token;

        // store username and jwt token in local storage to keep user logged in between page refreshes
        //localStorage.setItem('currentUser', JSON.stringify({ login: login, token: token }));

        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        return false;
      }

    });


  }


*/
  loggOut() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
/*
  login(login, senha) {
    console.log(JSON.stringify({login: login, senha: senha}));
    console.log( this.header);

    return this.http.post(
      'login', JSON.stringify({login: login, senha: senha}), {headers : this.header}
    ).map(res => res.json())
      .map((res) => {
        let token = res.json() && res.json().token;
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }
        return res.success;
      });

  }
*/
}
