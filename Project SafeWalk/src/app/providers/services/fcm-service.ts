import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import 'firebase/messaging';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  isWeb = false;
  constructor(private router: Router,
    private platform: Platform) {
      this.isWeb = !(this.platform.is('android') || this.platform.is('ios'));

      if (this.isWeb) {
        firebase.initializeApp(environment.firebase);
      }
  }

  initPush() {
    if (this.isWeb) {
      this.registerPush();
    }
  }


  private async registerPush() {
    console.log("********** inside registerPush ***********");
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
    });

    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();

    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }
}