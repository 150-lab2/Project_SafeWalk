import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginexamplePage } from './loginexample.page';

const routes: Routes = [
  {
    path: '',
    component: LoginexamplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginexamplePageRoutingModule {}
