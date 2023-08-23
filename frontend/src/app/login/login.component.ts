import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  responseMessage : any;

  
  constructor(
    private formBuilder: FormBuilder,
   private userService: UserService,
   private dialogRef: MatDialogRef<ForgotPasswordComponent>,
   private snackbarService: SnackbarService,
   private router: Router,
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]],
      password: [null, [Validators.required, Validators.pattern(GlobalConstants.passwordRegex),Validators.minLength(8)]]
    });
  }
  handleSubmit() {
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    };
    this.userService.login(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        // this.responseMessage = response?.message;
        // this.snackbarService.openSnackbar(this.responseMessage, '');
        this.router.navigate(['/cafe/dashboard']);
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
          console.log(this.responseMessage);
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackbar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
