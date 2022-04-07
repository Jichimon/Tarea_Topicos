import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageRefService } from 'src/app/services/local-storage-ref.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user = {
    name:'',
    phone:'',
    email:'',
    password:''
  };

  localStorage: Storage;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageRef: LocalStorageRefService,
    private router: Router
  ) {
    this.localStorage = this.localStorageRef.localStorage;
   }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(){
    let idS = this.localStorage.getItem('userId') ?? 0;
    var id: number = +idS;
    this.userService.getUser(id)
    .pipe(
      catchError( err => {
        console.log(err);
        return of();
      })
    )
    .subscribe( (data:any) => {
      console.log(data);
      let result = data;
      if (result.success) {
        let userData = result.user;
        this.user.email = userData.email ?? "";
        this.user.name = userData.name ?? "";
        this.user.phone = userData.phone ?? "";
      }
    });
  }


  onExit(){
    this.localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }

}
