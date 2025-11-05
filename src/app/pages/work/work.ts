import { Component } from '@angular/core';
import data from "./projects.json"

@Component({
  selector: 'app-work',
  imports: [],
  templateUrl: './work.html',
  styleUrl: './work.scss'
})
export class Work {
  projects = Object.values(data)
}
