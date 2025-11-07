import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowUp, faCircleCheck, faEnvelope, faLightbulb, faLocationDot, faPhone, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from "@angular/router";
import { FormsModule, NgForm } from '@angular/forms'
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  imports: [FontAwesomeModule, RouterLink, FormsModule],
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
  faSpinner = faSpinner

  emailFocused = false;
  messageFocused = false;
  toggleFieldFocus(event: any, field: "email" | "message", isFocused: boolean) {
    if (event.target.value && !isFocused) return;
    if (field === "email") this.emailFocused = isFocused;
    else this.messageFocused = isFocused
  }

  resizeTextArea(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = textarea.style.minHeight = '100%';
    textarea.style.minHeight = `${Math.min(textarea.scrollHeight + 2, parseInt(textarea.style.maxHeight))}px`;
    textarea.style.height = `${textarea.scrollHeight + 2}px`;
  }

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  email = ''
  message = ''
  loading = false
  sent = false
  async onSubmit(e: SubmitEvent) {
    this.loading = true
    try {
      await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target as HTMLFormElement, {
        publicKey: 'YOUR_PUBLIC_KEY',
      })
      this.sent = true
      setTimeout(() => {
        this.sent = false
      }, 200);
    }
    catch (error: unknown) {
      if (error instanceof EmailJSResponseStatus) {
        alert(error.text);
      }
    }
    finally {
      this.loading = false
      this.cdr.detectChanges();
    }
  }
}
