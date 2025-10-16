import { Component } from '@angular/core';
import { faAddressBook } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  imports: [FontAwesomeModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  faAddressBook = faAddressBook

  descHovering: boolean = false;

  descMouseEnter() {
    this.descHovering = true
  }
  descMouseLeave() {
    this.descHovering = false;
  }
}
