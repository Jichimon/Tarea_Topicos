import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageRefService } from 'src/app/services/local-storage-ref.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginRequest = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]
    )
  });

  private localStorage: Storage;

  constructor(
    public authService: AuthService,
    private localStorageRef: LocalStorageRefService,
    private _snackBar: MatSnackBar,
    private router: Router
    ) 
  { 
      this.localStorage = localStorageRef.localStorage;
  }

  ngOnInit(): void {
  }


  onLogin(){

    if (!this.loginRequest.valid) {
      this.OpenSnack("Email incorrecto y/o password vacía");
      return;
    }

    let request = {
      email: this.loginRequest.get('email')?.value,
      password: this.loginRequest.get('password')?.value
    }
    this.authService.login(request)
    .pipe(
      catchError( err => {
        console.log(err);
        return of();
      })
    )
    .subscribe( (data:any) => {
      console.log(data);
      let result = data;
      //guardar datos en el local storage
      if (result.success) {
        this.localStorage.clear();
        this.localStorage.setItem('userId', result.payload);
        this.router.navigate(['/user/profile']);
      }
    });
  }

  onRegister(){
    this.router.navigate(['/auth/signin']);
  }


  OpenSnack(message:string){
    this._snackBar.open(message, 'skip', {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: 'bottom'
      })
  }

}
