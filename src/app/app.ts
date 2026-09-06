import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VisitNotificationService } from './visit-notification.service';
import { ConsentService } from './consent.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App implements OnInit {
  private readonly visitNotification = inject(VisitNotificationService);
  private readonly consent = inject(ConsentService);

  ngOnInit(): void {
    if (this.consent.getChoice() === 'accepted') this.visitNotification.notifyOncePerSession();
  }
}
