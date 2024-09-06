import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = this.formBuilder.group({}); 
  submitted = false;
  registrationSuccess = false;
  registrationMessage = '';

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(event: Event) {
    event.preventDefault(); 

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const username = this.f['username'].value;
    const password = this.f['password'].value;

    this.registerService.registerUser(username, password).subscribe(
      response => {
        console.log('User registered successfully:', response);
        this.registrationSuccess = true;
        this.registrationMessage = 'User registered successfully';
      },
      error => {
        console.error('Error during registration:', error);
        this.registrationMessage = 'Registration failed';
      }
    );
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
    console.log('Redirecting to login page...');
  }
}