// add-contact.page.ts
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-contact',
  templateUrl: 'add-contact.page.html',
  styleUrls: ['add-contact.page.scss'],
})
export class AddContactPage {

  constructor(private navCtrl: NavController) {}

  goToTab1() {
    this.navCtrl.navigateBack('/tab1');
  }
}
