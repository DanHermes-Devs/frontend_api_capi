import { Routes } from '@angular/router';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { ContactFormComponent } from './pages/contact-form/contact-form.component';

export const routes: Routes = [
  { path: 'contacts', component: ContactListComponent },
  { path: 'contacts/create', component: ContactFormComponent },
  { path: 'contacts/edit/:id', component: ContactFormComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
];
