import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faCircleCheck, faEnvelope, faLightbulb, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  imports: [FontAwesomeModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  faLightBulb = faLightbulb
  faCircleCheck = faCircleCheck
  faEnvelope = faEnvelope
  faArrowUp = faArrowUp
  faLocationDot = faLocationDot
  faPhone = faPhone

  emailFocused = false;
  messageFocused = false;
  toggleFieldFocus(field: "email" | "message", isFocused: boolean) {
    if (field === "email") this.emailFocused = isFocused;
    else this.messageFocused = isFocused
  }

  resizeTextArea(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = textarea.style.minHeight = '100%';
    textarea.style.minHeight = `${Math.min(textarea.scrollHeight + 2, parseInt(textarea.style.maxHeight))}px`;
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
  }
}
