import { Component, inject } from '@angular/core';
import { ThemeConfig } from '../../tokens/theme.token';
import { Theme } from '../../services/theme-service';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  readonly themeConfig = inject(ThemeConfig);

  constructor() {
    console.log(this.themeConfig);
  }

  toggleTheme(theme: Theme) {
    this.themeConfig.toggleTheme(theme);
  }
}
