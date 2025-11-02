import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { config } from '@fortawesome/fontawesome-svg-core';
import { NgClass } from "@angular/common";
// Tell Font Awesome to skip adding the CSS automatically since it's being imported in styles.scss
config.autoAddCss = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, FontAwesomeModule, RouterLinkWithHref, NgClass]
})
export class App {
  constructor(private router: Router) { }

  protected readonly title = signal('portfolio_pro-angular');

  faLinkedin = faLinkedin
  faGithub = faGithub
  faBars = faBars

  menuOpen: boolean = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen
  }

  handleLinkClick(section: "" | "about" | "work" | "contact-me") {
    this.menuOpen = false;
    this.router.navigate([`/${section}`])
  }
}
