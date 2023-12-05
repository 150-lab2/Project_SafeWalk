import { DOCUMENT } from '@angular/common';
import { Injectable } from '@angular/core';
import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController, NavParams, ToastController } from '@ionic/angular';

declare var google: any

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
  constructor() {}

  async ngOnInit() {
    await this.loadMap();
  }

  async loadMap() {
    const coordinates = await Geolocation.getCurrentPosition();
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
        url: 'assets/img/Asset 14.png',
        scaledSize: new google.maps.Size(40, 70)
      }
    });
  }

  async placeMarker(contactLocations: any) {
    console.log(contactLocations);  // Log the entire array to check its contents
  
    if (!this.map) {
      console.error('Map is not initialized');
      this.loadMap();
      return;
    }
  
    for (let i = 0; i < contactLocations.length; i++) {

      let position = {
        lat: parseFloat(contactLocations[i].latitude),
        lng: parseFloat(contactLocations[i].longitude)
      };
  
      console.log(position);  // Log the position to check its value
  
      new google.maps.Marker({
        position: position,
        map: this.map,
        // Use a default marker for testing
      });
    }
  }
}
