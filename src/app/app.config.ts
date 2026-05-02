import {
  ApplicationConfig,
  inject,
  InjectionToken,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { Theme, ThemeService } from './services/theme-service';
import { ThemeConfig } from './tokens/theme.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAppInitializer(() => {
      const themeService = inject(ThemeService);
      const currentTheme = localStorage.getItem('theme');
      if (!currentTheme) {
        themeService.toggleTheme('LIGHT');
      } else {
        themeService.toggleTheme(currentTheme as Theme);
      }
    }),
    {
      provide: ThemeConfig,
      useExisting: ThemeService,
    },
  ],
};
