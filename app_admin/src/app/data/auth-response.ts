// Define the structure of the authentication response from the backend
export interface AuthResponse {

  // JWT token returned after successful login/register
  token: string;
}