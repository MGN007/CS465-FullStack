import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../data/user';
import { AuthResponse } from '../data/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Base URL for authentication API endpoints
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(
    // Inject HttpClient so we can make API calls
    private http: HttpClient,

    // Inject browser storage so we can save and read the JWT
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) { }

  // Save the JWT token in localStorage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Read the JWT token from localStorage
  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  // Remove the JWT token from localStorage when logging out
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  // Check whether the user is logged in and the token is still valid
  public isLoggedIn(): boolean {
    const token = this.getToken();

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }

    return false;
  }

  // Get current user information from the JWT payload
  public getCurrentUser(): User | null {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name, token } as User;
    }

    return null;
  }

  // Send login request to the backend
  public login(user: User, password: string) {
    return this.handleAuthAPICall('login', user, password);
  }

  // Send register request to the backend
  public register(user: User, password: string) {
    return this.handleAuthAPICall('register', user, password);
  }

  // Shared helper for login and register API calls
  private handleAuthAPICall(endpoint: string, user: User, password: string) {
    const formData = {
      name: user.name,
      email: user.email,
      password: password
    };

    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/${endpoint}`, formData);
  }
}