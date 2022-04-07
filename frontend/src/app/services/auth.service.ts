import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';


@Injectable()
export class AuthService {

  private baseUrl: string = 'http://localhost:3000/api/';

  constructor(
      private http: HttpClient,
      
      private userService: UserService
  ) 
  {   }

  login(users : any){
    return this.http.post(this.baseUrl+'auth/login', users);
  }


  logout(){
    console.log("Log Out");
  }


  signin(user: any){
    return this.userService.create(user);
  }

}
 