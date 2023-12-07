import { DOCUMENT } from '@angular/common';
import { Injectable } from '@angular/core';
import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'src/app/providers/services/account-service'; 
import { ModalController, NavParams, ToastController } from '@ionic/angular';

declare var google: any

interface ApiResponse{
  data: any[];
  emailArray: any[];
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;
  map: any;
  cntr: any;
  contact: any;

  user: any = {name: '', email: '', imageUrl: ''};
  contactLocations: any = {email: '', latitude: '', logitude: ''};
  constructor(private http: HttpClient, private accountService: AccountService) {}

  async ngOnInit() {
    await this.loadMap();
  }

  async loadMap() {
    const coordinates = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
    this.cntr = new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);
    //console.log(this.cntr);
    let mapOptions = {
      center: this.cntr,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Add a marker
    new google.maps.Marker({
      position: this.cntr,
      map: this.map,
      icon: {
        url: 'assets/img/Asset 15.png',
        scaledSize: new google.maps.Size(40, 70)
      }
    });
    try {
      this.user = await this.accountService.getUser();
      console.log(this.user.email);         //username is email of user
      this.http.post<ApiResponse>('https://safewalk.azurewebsites.net/getLocations', {email : this.user.email}).subscribe(       //POST method to backend to send lat and long
        (response) => {
          console.log('Retrieved List of Contacts!', response.emailArray);
          this.contactLocations = response.emailArray;
          for (let i = 0; i < this.contactLocations.length; i++) {
            let position = new google.maps.LatLng(this.contactLocations[i].latitude, this.contactLocations[i].longitude);
        
            console.log(position);  // Log the position to check its value
        
            new google.maps.Marker({
              position: position,
              map: this.map,
              icon: {
                url: 'assets/img/Asset 20_1.png',
                scaledSize: new google.maps.Size(40, 70)
              }
            });
          }
        },
        (error) => {            //prints out error if unsuccessful sending coordinates.
          console.error('Error posting data:', error);
          alert("Could not send coordinates");
        }
      );
      }
      catch (error){
        console.log('could not send coordinates')
      }
    console.log(this.contactLocations);  // Log the entire array to check its contents
    if (!this.map) {
      console.error('Map is not initialized');
      this.loadMap();
      return;
    }
  
    for (let i = 0; i < this.contactLocations.length; i++) {
      let position = new google.maps.LatLng(this.contactLocations[i].latitude, this.contactLocations[i].longitude);
  
      console.log(position);  // Log the position to check its value
  
      new google.maps.Marker({
        position: position,
        map: this.map,
        icon: {
          url: 'assets/img/Asset 14.png',
          scaledSize: new google.maps.Size(50, 50)
        }
      });
    }
  }

  async placeMarker(contactLocations: any) {
    try {
      this.user = await this.accountService.getUser();
      console.log(this.user.email);         //username is email of user
      this.http.post<ApiResponse>('http://localhost:3000/getLocations', {email : this.user.email}).subscribe(       //POST method to backend to send lat and long
        (response) => {
          console.log('Retrieved List of Contacts!', response.emailArray);
          this.contactLocations = response.emailArray;
          //this.Tab3Page.placeMarker(response.emailArray);
          //this.router.navigate(['/tabs/tab3']);
          
        },
        (error) => {            //prints out error if unsuccessful sending coordinates.
          console.error('Error posting data:', error);
          alert("Could not send coordinates");
        }
      );
      }
      catch (error){
        console.log('could not send coordinates')
      }
    console.log(this.contactLocations);  // Log the entire array to check its contents
    if (!this.map) {
      console.error('Map is not initialized');
      this.loadMap();
      return;
    }
  
    for (let i = 0; i < this.contactLocations.length; i++) {
      let position = new google.maps.LatLng(this.contactLocations[i].latitude, this.contactLocations[i].longitude);
  
      console.log(position);  // Log the position to check its value
  
      new google.maps.Marker({
        position: position,
        map: this.map,
        icon: {
          url: 'assets/img/Asset 14.png',
          scaledSize: new google.maps.Size(40, 70)
        }
      });
    }
  }
}
