// app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'aaron-contact',
    loadChildren: () => import('./aaron-contact/aaron-contact.module').then(m => m.AaronContactPageModule)
  },
  { path: 'add-contact', loadChildren: () => import('./aaron-contact/aaron-contact.module').then(m => m.AaronContactPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
