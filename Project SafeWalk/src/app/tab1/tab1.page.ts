import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationPosition } from '@capacitor/geolocation';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  location: any = {latitude: '', logitude: ''};
  addContact: any = {name: '', phone: '', relation: ''};

  contactList = [
    {name: 'John Doe', phone: '123-456-7890', relation: 'Friend'},
    {name: 'Jane Doe', phone: '123-456-7890', relation: 'Friend'}
  ];

  constructor(private http: HttpClient, private router: Router) {}

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
  CheckWhoIsNear() {
    console.log("opening map on location tab");
    this.router.navigate(['/tabs/tab3']);
  }

  showTrustedList() {
    console.log("Showing current list of trusted contacts");

  }

  reportArea() {          //reports the area to the backend (future plans to send to authorities)
    console.log("Reporting the area successful");
    alert("Reporting the area successful");
  }

  saveContact() {           //saves contact to list as a JSON object
    this.contactList.push(this.addContact);
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
}
