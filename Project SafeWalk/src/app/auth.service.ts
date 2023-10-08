import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  login(username: string, password: string): boolean {
    // Add your authentication logic here
    if (username === 'yourUsername' && password === 'yourPassword') {
      return true;
    }
    return false;
  }
}