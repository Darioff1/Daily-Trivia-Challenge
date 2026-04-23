import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonToggle } from '@ionic/angular/standalone';
import { StorageService } from '../../services/storage.service';
import { NotificationService } from '../../services/notification.service';

export interface UserSettings {
  difficulty: string;
  notifications: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonButton, IonToggle, CommonModule, FormsModule]
})
export class SettingsPage implements OnInit {

  settings: UserSettings = {
    difficulty: 'medium',
    notifications: false
  };

  constructor(private storageService: StorageService, private notificationService: NotificationService) {}

  async ngOnInit() {
    await this.storageService.init();
    const saved = await this.storageService.getSettings();
    if (saved) this.settings = saved;
  }

  async saveSettings() {
    await this.storageService.saveSettings(this.settings);
    if (this.settings.notifications) {
      const granted = await this.notificationService.requestPermission();
      if (granted) await this.notificationService.scheduleDailyNotification();
    } else {
      await this.notificationService.cancelNotification();
    }
  }

  async clearHistory() {
    await this.storageService.clearHistory();
  }
}