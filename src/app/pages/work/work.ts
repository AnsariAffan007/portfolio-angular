import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import data from "./projects.json"
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-work',
  imports: [FaIconComponent],
  templateUrl: './work.html',
  styleUrl: './work.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Work {
  projects = Object.values(data)

  faArrowUpRightFromSquare = faArrowUpRightFromSquare
  faGithub = faGithub
  faYoutube = faYoutube
}
