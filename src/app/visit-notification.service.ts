import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_19xs75r';
const EMAILJS_TEMPLATE_ID = 'template_4bfacsq';
const EMAILJS_PUBLIC_KEY = '6dNWzPG_cRUPpe1ZU';
const VISIT_RECORDED_KEY = 'himanshi-portfolio-visit-recorded';

@Injectable({ providedIn: 'root' })
export class VisitNotificationService {
  notifyOncePerSession(consentStatus = 'previously accepted'): void {
    if (typeof window === 'undefined' || sessionStorage.getItem(VISIT_RECORDED_KEY)) return;

    void emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      name: 'Portfolio visitor',
      email: 'no-reply@portfolio.local',
      from_name: 'Portfolio visitor',
      from_email: 'no-reply@portfolio.local',
      reply_to: 'no-reply@portfolio.local',
      message: 'A visitor opened the portfolio.',
      title: 'New portfolio visit',
      time: new Date().toLocaleString(),
      page_url: window.location.href,
      referrer: document.referrer || 'Direct visit',
      consent_status: consentStatus,
      to_email: 'Himansi.07.gpt@gmail.com',
    }, { publicKey: EMAILJS_PUBLIC_KEY }).then(() => {
      sessionStorage.setItem(VISIT_RECORDED_KEY, 'true');
    }).catch((error) => {
      // Never interrupt a visitor, but retain the provider response for debugging.
      console.error('Portfolio visit notification failed:', error);
    });
  }
}
