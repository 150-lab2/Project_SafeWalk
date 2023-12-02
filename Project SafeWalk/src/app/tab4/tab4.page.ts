import { Component } from '@angular/core';
import { LoginService } from 'src/app/providers/services/login-service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(public loginService: LoginService) {}

}
