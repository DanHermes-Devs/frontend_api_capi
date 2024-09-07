import { Routes } from '@angular/router';
import { ContactListComponent } from './pages/contact-list/contact-list.component';

export const routes: Routes = [
  { path: 'contacts', component: ContactListComponent },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' }
];
