import { Component, inject } from '@angular/core';
import { faAddressBook } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private router = inject(Router)

  faAddressBook = faAddressBook

  descHovering: boolean = false;

  descMouseEnter() {
    this.descHovering = true
  }
  descMouseLeave() {
    this.descHovering = false;
  }

  openResume() {
    window.open("/Mohammed_Affan-Ansari.pdf", '_blank');
  }

  navigate(to: "about" | "work") {
    this.router.navigate([`/${to}`])
  }
}
