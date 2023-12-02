import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, ViewChild, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { ModalController, NavParams, ToastController } from '@ionic/angular';

declare var google: any

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;
  map: any;
  constructor() {}

  async ngOnInit() {
    await this.loadMap();
  }

  async loadMap() {
    const coordinates = await Geolocation.getCurrentPosition();
    let latLng = new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Add a marker
    new google.maps.Marker({
      position: latLng,
      map: this.map,
      icon: {
        url: 'assets/img/Asset 14.png',
        scaledSize: new google.maps.Size(40, 70)
      }
    });
  }
}
