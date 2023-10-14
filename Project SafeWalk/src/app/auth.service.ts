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

  async getUsers(){

    try {
      const res = await fetch('kdakdaskdn');
      if(!res.ok) throw new Error(`daijdalsdl`)

      return await res.json()
      
    } catch (error) {
      // show user err message
    }



  }
}