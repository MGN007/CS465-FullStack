import { InjectionToken } from '@angular/core';

// Create a browser storage token so Angular can inject localStorage where needed
export const BROWSER_STORAGE = new InjectionToken<Storage>(
  'Browser Storage',
  {
    providedIn: 'root',
    factory: () => localStorage
  }
);

// Export an empty Storage class placeholder used by the application structure
export class Storage {
}