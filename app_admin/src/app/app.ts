import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'Travlr Getaways Admin';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  // Check whether the current user is logged in
  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  // Log the user out and return to home page
  logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl('/');
  }
}