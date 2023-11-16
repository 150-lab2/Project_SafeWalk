import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/providers/services/login-service';
import { ModalController } from '@ionic/angular';

interface LoginResponse {
  access: { access: boolean };
  data?: any;  // Replace 'any' with a more specific type if you have the structure
  msg?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  emaill: string = '';
  username: string = '';
  password: string = '';
  data: []= [];
  
  posttData: any = {emaill: '', password: ''};                  //login object
  postSignUp: any = {username: '', email: '', password: ''};    //signUp object

  constructor(private http: HttpClient, private router: Router, public loginService: LoginService, 
    public modalController: ModalController ) { }                 // initializes the http, router, and modalController vars and LoginService class


  ionViewDidEnter() {
    this.loginService.initialize();
  }

  postData() {                //performs login functionality. Checking if login is correct
    this.http.post<LoginResponse>('http://localhost:3000/login', this.posttData).subscribe(
      (response) => {
        if (response.access.access) {                     //recieves response brom backend and shecks if access object is ture
          console.log('Login successful:', response.data);
          this.router.navigate(['/tabs']);
        } else {
          console.log('Login failed:', response.msg);
          alert("Login Failed: " + (response.msg || 'Unknown error'));
        }
      },
      (error) => {            //prints out error if unsuccessful login attempt is made.
        console.error('Error posting data:', error);
        alert("Login Failed");
      }
    );
  }

  postSignUpReq() {           // Sign Up POST request
    this.http.post('http://localhost:3000/signup', this.postSignUp).subscribe(
      async (response) => {
        console.log('Data posted successfully:', response);
        await this.modalController.dismiss();         //closes modal before routing to home
        this.router.navigate(['/tabs']);              // routes to home page
      },
      (error) => {            //prints out error if unsuccessful signup attempt is made.
        console.error('Error posting data:', error);
        alert("Sign Up Failed");
      }
    );
  }

  isModalOpen = false;        //controls the sub window (modal) for sign up 
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
