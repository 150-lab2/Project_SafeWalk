import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

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

  posttData: any = {email: '', password: ''};

  constructor(private http: HttpClient, private router: Router) { }
  

  postData() {                //chekcing if login is correct
    this.http.post('http://localhost:3000/login', this.posttData).subscribe(
      (response) => {
        console.log('Data posted successfully:', response);
        this.router.navigate(['/tabs']);              // routes to home page
      },
      (error) => {            //prints out error if unsucessful login attempt is made.
        console.error('Error posting data:', error);
      }
    );
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
}
