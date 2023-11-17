import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/providers/services/login-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  email: string = '';
  username: string = '';
  password: string = '';
  data: []= [];

  posttData: any = {emaill: '', password: ''};
  postSignUp: any = {username: '', email: '', password: ''};

  constructor(private http: HttpClient, private router: Router, public loginService: LoginService) { }


  ionViewDidEnter() {
    this.loginService.initialize();
  }

  postData() {                //performs login functionality. Checking if login is correct
    this.http.post('http://localhost:3000/login', this.posttData).subscribe(
      (response) => {
        console.log('Data posted successfully:', response);
        this.router.navigate(['/tabs']);              // routes to home page
      },
      (error) => {            //prints out error if unsuccessful login attempt is made.
        console.error('Error posting data:', error);
        alert("Login Failed");
      }
    );
  }

  postSignUpReq() {           // Sign Up POST request
    this.http.post('http://localhost:3000/signup', this.postSignUp).subscribe(
      (response) => {
        console.log('Data posted successfully:', response);
        this.router.navigate(['/tabs']);              // routes to home page
      },
      (error) => {            //prints out error if unsuccessful signup attempt is made.
        console.error('Error posting data:', error);
        alert("Sign Up Failed");
      }
    );
  }

  isModalOpen = false;        //opens up the sub window (modal) for sign up 
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
