import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Work } from './pages/work/work';

export const routes: Routes = [
  {
    path: "",
    component: Home
  },
  {
    path: "about",
    component: About
  },
  {
    path: "contact-me",
    component: Contact
  },
  {
    path: "work",
    component: Work
  }
];
