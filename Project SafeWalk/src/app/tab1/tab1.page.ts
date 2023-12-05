import { Component } from '@angular/core';
import { ElementRef, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationPosition } from '@capacitor/geolocation';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Tab3Page } from '../tab3/tab3.page';
import { AccountService } from 'src/app/providers/services/account-service';  // Update with the correct path to your service
import { FcmService } from 'src/app/providers/services/fcm-service';  // Update with the correct path to your FcmService

declare var google: any

interface ApiResponse{
    data: any[];
    emailArray: any[];
  }

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page{ 
  //@ViewChild('mapElement') mapElement!: ElementRef;
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;
  map: any;
  cntr: any;
  contact: any;
  
  contactLocations: any = {email: '', latitude: '', logitude: ''};
  location: any = {latitude: '', logitude: ''};
  addContact: any = {username: '', contactUsername: '', phone: '', relation: ''};
  user: any = {name: '', email: '', imageUrl: ''};

  contactList = [
    {contact_name: 'John Doe', phone: '123-456-7890', relation: 'Friend'},
    {contact_name: 'Jane Doe', phone: '123-456-7890', relation: 'Friend'}
  ];

  constructor(private http: HttpClient, private router: Router, public fcmService: FcmService,
     private accountService: AccountService, private Tab3Page: Tab3Page) {}

  // Gathers the longitude and latitude coordinates. 
  async getLocation() {
    try {
    const coordinates: GeolocationPosition = await Geolocation.getCurrentPosition();
    this.location.latitude = coordinates.coords.latitude;
    this.location.longitude = coordinates.coords.longitude;
    this.http.post('http://localhost:3000/emergency', this.location).subscribe(       //POST method to backend to send lat and long
      (response) => {
        console.log('Emergency Response Sent', response);
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
  }

  /* FUNCTIONS TO CONTROL THE SUB WINDOWS (MODALS) AND THEIR OPERATIONS BELOW */
  async CheckWhoIsNear() {
    console.log("opening map on location tab");
    console.log("creating pins for contacts");
    try {
      this.user = await this.accountService.getUser();
      console.log(this.user.email);         //username is email of user
      this.http.post<ApiResponse>('http://localhost:3000/getLocations', {email : this.user.email}).subscribe(       //POST method to backend to send lat and long
        (response) => {
          console.log('Retrieved List of Contacts!', response.emailArray);
          this.contactLocations = response.emailArray;
          this.router.navigate(['/tabs/tab3']);
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
  }

  async showTrustedList() {
    console.log("Showing current list of trusted contacts");
    this.isModalOpen1 = true;
    this.setOpen1(true);
    try {
      this.user = await this.accountService.getUser();
      console.log(this.user.email);         //username is email of user
      this.http.post<ApiResponse>('http://localhost:3000/getContacts', {email : this.user.email}).subscribe(       //POST method to backend to send lat and long
        (response) => {
          console.log('Retrieved List of Contacts!', response.data);
          console.log(response);
          this.contactList = response.data;
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
  }

  reportArea() {          //reports the area to the backend (future plans to send to authorities)
    console.log("Reporting the area successful");
    alert("Reporting the area successful");
  }

  async saveContact() {           //saves contact to list as a JSON object
    try {
      this.user = await this.accountService.getUser();
      console.log(this.user.email);
      this.addContact.username = this.user.email;             //username is email of user
      this.http.post('http://localhost:3000/addcontact', this.addContact).subscribe(       //POST method to backend to send lat and long
        (response) => {
          console.log('Emergency Response Sent', response);
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
    //this.contactList.push(this.addContact);
    this.setOpen(false);      //closes modal after saving contact
  }

  removeContact(contact: any): void {
    const confirmDelete = confirm("Are you sure you want to delete this contact?"); // displays confirmation dialog
    if (confirmDelete) {
      console.log("Removing contact");
      this.contactList = this.contactList.filter(c => c !== contact);
      console.log(this.contactList);
    }
  }

  isModalOpen = false;        //controls the sub window (modal) for adding contacts form
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  isModalOpen1 = false;        //controls the sub window (modal) for sign up 
  setOpen1(isOpen1: boolean) {
    this.isModalOpen1 = isOpen1;
  }

  isModalOpen2 = false;        //controls the sub window (modal) for checking who is near map
  setOpen2(isOpen2: boolean) {
    this.isModalOpen2 = isOpen2;
  }
}
