import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabsPage } from 'src/app/tabs/tabs.page';

@Component({
  selector: 'app-loginexample',
  templateUrl: './loginexample.page.html',
  styleUrls: ['./loginexample.page.scss'],
})
export class LoginexamplePage {
  //console.log();
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Add your login logic here
    if (this.username === 'yourUsername' && this.password === 'yourPassword') {
      // Navigate to the tabs page after successful login
      console.log('Login successful');
      this.router.navigate(['/tabs']);
    } else {
      // Display an error message or handle authentication failure
      console.log('Login failed');
    }
  }
}
