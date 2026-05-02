import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from './services/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly themeService = inject(ThemeService);

  constructor() {
    effect(() => {
      const currentTheme = this.themeService.currentTheme();

      if (currentTheme === 'SYSTEM') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.className = isDark ? 'dark' : 'light';
      } else {
        document.body.className = currentTheme.toLowerCase();
      }
    });
  }
}
