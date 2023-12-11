import { Component } from '@angular/core';
import { LoginService } from 'src/app/providers/services/login-service';
import { AppPagePath, AppStorageKey } from "src/app/models/enums/app-constant";
import { LocalStorageService } from 'src/app/providers/services/local-storage-service';
import { AccountService } from 'src/app/providers/services/account-service';  // Update with the correct path to your service
import { OnInit } from '@angular/core';
import { IUserDetails } from 'src/app/models/user/user-details';  // Update with the correct path to your IUserDetails interface

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page implements OnInit{
  user: any = {name: '', email: '', imageUrl: ''};
  //user: IUserDetails = {name: '', email: '', imageUrl: ''};  // Update with the correct path to your IUserDetails interface
  constructor(public loginService: LoginService, private localStorageService: LocalStorageService, private accountService: AccountService) {}

  async ngOnInit() {
    // Retrieve the user's information from local storage
    this.user = await this.accountService.getUser();
  }

  async display() {
    this.user = await this.accountService.getUser();
    console.log(this.user.email);
  }
}
