import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons"

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
