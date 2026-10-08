import { Component } from '@angular/core';
import { SettingsAdapterService } from './settings-adapter.service';

@Component({
  standalone: true,
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [SettingsAdapterService]
})
export class SettingsComponent {}
