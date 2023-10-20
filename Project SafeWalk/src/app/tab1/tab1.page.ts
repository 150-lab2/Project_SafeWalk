import { Component } from '@angular/core';
import { GeolocationPosition } from '@capacitor/geolocation';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  constructor() {}

  // Gathers the longitude and latitude coordinates. 
  async getLocation() {
    const coordinates: GeolocationPosition = await Geolocation.getCurrentPosition();
    console.log('Latitude: ', coordinates.coords.latitude);
    console.log('Longitude: ', coordinates.coords.longitude);

    /* this will prints all information located to the coordinates gathering function.*/
    // const coordinates = await Geolocation.getCurrentPosition();
    // console.log('Current position:', coordinates);

  }
}
