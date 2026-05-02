import { Injectable, signal } from '@angular/core';

export type Theme = 'LIGHT' | 'DARK' | 'SYSTEM';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  readonly themes: Theme[] = ['LIGHT', 'DARK', 'SYSTEM'];
  private _currentTheme = signal<Theme>('LIGHT');
  readonly currentTheme = this._currentTheme.asReadonly();

  public toggleTheme(theme: Theme): void {
    this._currentTheme.set(theme);
    localStorage.setItem('theme', this._currentTheme());
  }
}
