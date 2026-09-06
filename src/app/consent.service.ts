import { Injectable } from '@angular/core';

export type ConsentChoice = 'accepted' | 'declined' | null;
const CONSENT_COOKIE = 'himanshi_portfolio_consent';
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

@Injectable({ providedIn: 'root' })
export class ConsentService {
  getChoice(): ConsentChoice {
    if (typeof document === 'undefined') return null;
    const value = document.cookie.split('; ').find((item) => item.startsWith(`${CONSENT_COOKIE}=`))?.split('=')[1];
    return value === 'accepted' || value === 'declined' ? value : null;
  }

  accept(): void { this.save('accepted'); }
  decline(): void { this.save('declined'); }

  private save(choice: Exclude<ConsentChoice, null>): void {
    document.cookie = `${CONSENT_COOKIE}=${choice}; max-age=${CONSENT_MAX_AGE}; path=/; samesite=lax`;
  }
}
