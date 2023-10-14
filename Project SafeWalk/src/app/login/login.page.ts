import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  data: []= [];

  //$observ: Observable

  posttData: any = {name: '', password: ''};

  constructor(private http: HttpClient) { }

  postData() {
    this.http.post('http://localhost:3000/login', this.posttData).subscribe(
      (response) => {
        console.log('Data posted successfully:', response);
      },
      (error) => {
        console.error('Error posting data:', error);
      }
    );
  }
}
