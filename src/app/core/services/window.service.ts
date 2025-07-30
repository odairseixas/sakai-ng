import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  alert(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    alert('NS:\n'+ type + ': ' + message);
  }

  confirm(message: string): boolean {
    return confirm('NS:\n'+ message);
  }

  prompt(message: string, defaultValue: string | null = null): string | null {
    return prompt('NS:\n'+ message, defaultValue || '');
  }

  open(url: string, target: string = '_blank'): void {
    window.open(url, target);
  }
}
