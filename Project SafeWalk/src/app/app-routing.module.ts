import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { LoginexammplePage } from './loginexample/loginexample-routing.module'; // Import your login component
import { TabsPage } from './tabs/tabs.page'; // Import your tabs page component
import { Router } from '@angular/router';



const routes: Routes = [
  {
    path: 'login', // Define a route for the login page
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'tabs', // Define a route for the tabs page
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  { 
    path: '', 
    redirectTo: 'login', // Set the initial route to the login page
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

