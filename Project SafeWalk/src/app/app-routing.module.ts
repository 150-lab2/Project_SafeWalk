import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs/tabs.page'; 
import { Router } from '@angular/router';



const routes: Routes = [
  {
    path: 'login', // Login page route
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)   //loads the login page
  },
  {
    path: 'tabs', // Tabs module route
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),     //loads the tabs and its children (tab1, tab2, tab3, tab4)
  },
  { 
    path: '',             //defualt route 
    redirectTo: 'login', // When app is first loaded, displays login page first. 
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

