import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]] // firebase need password size >= 6
    });
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;

    this.authService.createNewUser(email, password, username).then(
      () => {
        this.toastr.success('user created success ' + this.authService.user.name);
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
        this.toastr.error(error);
      }
    );

  }


}