import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = 'http://localhost:3000/api/';

  constructor(
    private http: HttpClient,
     private router:Router
  ) { }

  login(users : any){
    return this.http.post(this.baseUrl+'auth/login', users)
  }


  signin(user: any){
    return this.http.post(this.baseUrl+'users/create', user)
  }

}
