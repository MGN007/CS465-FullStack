// Define the structure of a User object used in the application
export class User {

  // User's display name
  name!: string;

  // User's email (used for login)
  email!: string;

  // JWT token returned after login/register
  token!: string;
}