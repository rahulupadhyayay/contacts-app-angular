import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './pages/contacts/contact-list.component';
import { AddEditContactComponent } from './pages/contacts/addEdit-contact.component';

export const routes: Routes = [
  {path: '', component: ContactComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'addEditContact', component: AddEditContactComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],                                                                                                                                                                                                                                                                                                          
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  