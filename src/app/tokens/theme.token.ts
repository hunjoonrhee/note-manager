import { InjectionToken } from '@angular/core';
import { ThemeService } from '../services/theme-service';

export const ThemeConfig = new InjectionToken<ThemeService>('THEME_SERVICE');
