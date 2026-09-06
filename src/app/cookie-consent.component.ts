import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ConsentService } from './consent.service';
import { VisitNotificationService } from './visit-notification.service';

@Component({ selector: 'app-cookie-consent', imports: [NgIf], templateUrl: './cookie-consent.component.html', styleUrl: './cookie-consent.component.scss' })
export class CookieConsentComponent {
  private readonly consent = inject(ConsentService);
  private readonly visitNotification = inject(VisitNotificationService);
  readonly isVisible = signal(this.consent.getChoice() === null);
  accept(): void { this.consent.accept(); this.visitNotification.notifyOncePerSession('accepted'); this.isVisible.set(false); }
  decline(): void { this.consent.decline(); this.isVisible.set(false); }
}
