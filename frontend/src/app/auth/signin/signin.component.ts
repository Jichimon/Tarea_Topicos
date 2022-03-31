import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  request = {
    name:'',
    phone:'',
    email:'',
    password:''
  };

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegister(){
    this.authService.signin(this.request).subscribe(
      (data:any) => {
        console.log(data);
      }
    );
  }

  onReturn(){
    this.router.navigate(['/auth/login']);
  }

}
