import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../data/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  // Store form error messages
  public formError: string = '';

  // Hold user-entered credentials
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    // Inject Angular router so we can redirect after login
    private router: Router,

    // Inject authentication service so we can call login
    private authenticationService: AuthenticationService
  ) { }

  // Handle login form submission
  public onLoginSubmit(): void {

    // Clear previous error message
    this.formError = '';

    // Validate that all fields were entered
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {

      // If valid, continue login
      this.doLogin();
    }
  }

  // Perform the login call
  private doLogin(): void {
    console.log('Login button clicked');

    // Build a User object from the form data
    const newUser = {
      name: this.credentials.name,
      email: this.credentials.email,
      token: ''
    } as User;

    // Call the login service
    this.authenticationService.login(newUser, this.credentials.password)
      .subscribe({
        next: (response) => {

          // Save token after successful login
          this.authenticationService.saveToken(response.token);

          // Redirect back to trip list page
          this.router.navigateByUrl('/');
        },
        error: () => {

          // Show error if login fails
          this.formError = 'Login failed, please try again';
        }
      });
  }
}