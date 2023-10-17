import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginexamplePageRoutingModule } from './loginexample-routing.module';
import { LoginexamplePage } from './loginexample.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginexamplePageRoutingModule
  ],
  declarations: [LoginexamplePage]
})
export class LoginexamplePageModule {}
