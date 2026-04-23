import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { UserSettings } from '../pages/settings/settings.page';

export interface AnsweredQuestion {
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
  isCorrect: boolean;
  category: string;
  difficulty: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageReady = false;

  constructor(private storage: Storage) {}

  async init() {
    if (this.storageReady) return;
    await this.storage.create();
    this.storageReady = true;
  }

  async saveAnswer(answer: AnsweredQuestion) {
    const history = await this.getHistory();
    history.push(answer);
    await this.storage.set('history', history);
  }

  async getHistory(): Promise<AnsweredQuestion[]> {
    const history = await this.storage.get('history');
    return history || [];
  }

  async clearHistory() {
    await this.storage.remove('history');
  }

  async saveSettings(settings: UserSettings) {
    await this.storage.set('settings', settings);
  }

  async getSettings(): Promise<UserSettings | null> {
    return await this.storage.get('settings');
  }
}