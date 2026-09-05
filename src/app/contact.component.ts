import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_19xs75r';
const EMAILJS_TEMPLATE_ID = 'template_4bfacsq';
const EMAILJS_PUBLIC_KEY = '6dNWzPG_cRUPpe1ZU';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  readonly isSending = signal(false);
  readonly status = signal<'success' | 'error' | null>(null);
  readonly errorMessage = signal('Something went wrong. Please email me directly instead.');

  async send(form: NgForm): Promise<void> {
    if (form.invalid || this.isSending()) return;
    this.isSending.set(true);
    this.status.set(null);

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: form.value.name,
        email: form.value.email,
        from_name: form.value.name,
        from_email: form.value.email,
        reply_to: form.value.email,
        message: form.value.message,
        to_email: 'Himansi.07.gpt@gmail.com',
        title: `New portfolio message from ${form.value.name}`,
        time: new Date().toLocaleString(),
      }, { publicKey: EMAILJS_PUBLIC_KEY });
      form.resetForm();
      this.status.set('success');
    } catch (error: unknown) {
      const detail = typeof error === 'object' && error !== null && 'text' in error
        ? String(error.text)
        : 'Something went wrong. Please email me directly instead.';
      this.errorMessage.set(detail);
      this.status.set('error');
    } finally {
      this.isSending.set(false);
    }
  }
}
