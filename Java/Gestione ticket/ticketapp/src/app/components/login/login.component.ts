import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Users } from '../../models/users';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  loginFailed = false; 

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router 
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const username = this.f['username'].value;
    const password = this.f['password'].value;

    this.loginService.authenticate(username, password).subscribe(
      (user: Users | null) => {
        if (user) {
          localStorage.setItem('username', username); // Guardar el nombre de usuario

          if (user.credentials === 'amministratore di sistema') {
            this.router.navigate(['/ticket']);
          } else if (user.credentials === 'utente semplice') {
            this.router.navigate(['/clientTicket']);
          } else {
            console.log('You do not have permission to access this page');
            this.loginFailed = true;
          }
        } else {
          console.log('Invalid credentials');
          this.loginFailed = true;
        }
      },
      (error) => {
        console.error('Error during authentication:', error);
        this.loginFailed = true;
      }
    );
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}
