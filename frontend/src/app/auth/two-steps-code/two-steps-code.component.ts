import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageRefService } from 'src/app/services/local-storage-ref.service';

@Component({
  selector: 'app-two-steps-code',
  templateUrl: './two-steps-code.component.html',
  styleUrls: ['./two-steps-code.component.scss']
})
export class TwoStepsCodeComponent implements OnInit {


  requestForm = new FormGroup({
    code: new FormControl(
      '',
      [
        Validators.required,
      ]
    )
  });

  localStorage: Storage;

  constructor(
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    private localStorageRef: LocalStorageRefService,
    private router: Router
  ) { 
    this.localStorage = this.localStorageRef.localStorage;
  }

  ngOnInit(): void {
  }

  onRegister(){

    if (!this.requestForm.valid) {
      this.OpenSnack("Revisar campos");
      return;
    }

    let idS = this.localStorage.getItem('userToConfirm') ?? 0;
    var id: number = +idS;
    let request = {
      code: this.requestForm.get('code')?.value,
      userId: id,
    }


    this.authService.checkTwoStepsCode(request)
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

      this.OpenSnack(result.message);
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
