import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  requestForm = new FormGroup({
    name: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    phone: new FormControl(
      '',
      [
        Validators.minLength(7),
        Validators.maxLength(10),
      ]
    ),
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

  constructor(
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegister(){

    if (!this.requestForm.valid) {
      this.OpenSnack("Revisar campos");
      return;
    }

    let request = {
      email: this.requestForm.get('email')?.value,
      name: this.requestForm.get('name')?.value,
      phone: this.requestForm.get('phone')?.value,
      password: this.requestForm.get('password')?.value
    }


    this.authService.signin(request)
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
        console.log(result.message);
      }
    });
  }

  onReturn(){
    this.router.navigate(['/auth/login']);
  }


  OpenSnack(message:string){
    this._snackBar.open(message, 'CERRAR', {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: 'bottom'
      })
  }

}
