import { Component } from '@angular/core';
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

  constructor(private http: HttpClient) {}

  // Gathers the longitude and latitude coordinates. 
  async getLocation() {
    try {
    const coordinates: GeolocationPosition = await Geolocation.getCurrentPosition();
    this.location.latitude = coordinates.coords.latitude;
    this.location.longitude = coordinates.coords.longitude;
    this.http.post('http://localhost:3000/emergency', this.location).subscribe(       //POST method to backend to send lat and long
      (response) => {
        console.log('Data posted successfully:', response);
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
}
