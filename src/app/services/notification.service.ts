import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  async requestPermission(): Promise<boolean> {
    if (!Capacitor.isNativePlatform()) return true;
    const permission = await LocalNotifications.requestPermissions();
    return permission.display === 'granted';
  }

  async scheduleDailyNotification() {
    if (!Capacitor.isNativePlatform()) return;

    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });

    await LocalNotifications.schedule({
      notifications: [
        {
          id: 1,
          title: 'Daily Trivia Challenge 🧠',
          body: 'Your daily question is ready! Can you keep your streak alive?',
          schedule: {
            every: 'day',
            on: { hour: 9, minute: 0 }
          },
          sound: undefined,
          attachments: undefined,
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }

  async cancelNotification() {
    if (!Capacitor.isNativePlatform()) return;
    await LocalNotifications.cancel({ notifications: [{ id: 1 }] });
  }
}