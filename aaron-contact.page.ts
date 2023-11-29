// aaron-contact.page.ts

import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-aaron-contact',
  templateUrl: 'aaron-contact.page.html',
  styleUrls: ['aaron-contact.page.scss'],
})
export class AaronContactPage {
  contactList = [
    { name: 'John Doe', phoneNumber: '555-1234' },
    { name: 'Jane Smith', phoneNumber: '555-5678' },
    // Add more contacts as needed
  ];

  addContactFormVisible = false;

  constructor(private alertController: AlertController) {}

  removeContact(contact: any): void {
    this.contactList = this.contactList.filter(c => c !== contact);
  }

  async callContact(contact: any): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Calling Contact',
      message: `Calling ${contact.name} at ${contact.phoneNumber}`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  toggleAddContactForm(): void {
    // Toggle the visibility of the add contact form
    this.addContactFormVisible = !this.addContactFormVisible;
  }

  addContact(form: any): void {
    if (form.valid) {
      const newPhoneNumber = form.value.phoneNumber.trim(); // Remove leading and trailing whitespaces
      const phoneNumberPattern = /^(1-)?\d{3}-\d{3}-\d{4}$/;

      if (phoneNumberPattern.test(newPhoneNumber)) {
        const newContact = { name: form.value.name, phoneNumber: newPhoneNumber };
        this.contactList.push(newContact);

        // Clear the form after adding a contact
        form.resetForm();

        // Hide the add contact form after submission
        this.addContactFormVisible = false;
      } else {
        this.showInvalidPhoneNumberAlert();
      }
    }
  }

  async showInvalidPhoneNumberAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Invalid Phone Number',
      message: 'Please enter a valid phone number in the format 1-XXX-XXX-XXXX or XXX-XXX-XXXX.',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
