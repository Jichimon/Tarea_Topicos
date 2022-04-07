import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageRefService } from './local-storage-ref.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'http://localhost:3000/api/users';
  private localStorage: Storage;

  constructor(
        private http: HttpClient,
        private localStorageRef: LocalStorageRefService
  ) 
  { 
      this.localStorage = localStorageRef.localStorage;
  }


  getUser(id:number): any {

      this.http.get(this.baseUrl+'/find/'+ id);
  }

  create(user: any){
    return this.http.post(this.baseUrl+'/create', user)
  }

}