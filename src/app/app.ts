import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"
import { config } from '@fortawesome/fontawesome-svg-core';
// Tell Font Awesome to skip adding the CSS automatically since it's being imported in styles.scss
config.autoAddCss = false; 

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [RouterOutlet, FontAwesomeModule]
})
export class App {
  protected readonly title = signal('portfolio_pro-angular');
  faLinkedin = faLinkedin
  faGithub = faGithub
}
