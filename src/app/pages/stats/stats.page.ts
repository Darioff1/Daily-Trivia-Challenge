import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { StorageService, AnsweredQuestion } from '../../services/storage.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid, IonRow, IonCol, CommonModule, NgIf]
})
export class StatsPage implements OnInit {

  totalAnswered = 0;
  totalCorrect = 0;
  totalWrong = 0;
  accuracy = 0;
  currentStreak = 0;
  bestStreak = 0;

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    await this.storageService.init();
    const history = await this.storageService.getHistory();
    this.calculateStats(history);
  }

  calculateStats(history: AnsweredQuestion[]) {
    this.totalAnswered = history.length;
    this.totalCorrect = history.filter(q => q.isCorrect).length;
    this.totalWrong = this.totalAnswered - this.totalCorrect;
    this.accuracy = this.totalAnswered > 0 ? Math.round((this.totalCorrect / this.totalAnswered) * 100) : 0;
    this.currentStreak = this.calculateCurrentStreak(history);
    this.bestStreak = this.calculateBestStreak(history);
  }

  calculateCurrentStreak(history: AnsweredQuestion[]): number {
    let streak = 0;
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].isCorrect) streak++;
      else break;
    }
    return streak;
  }

  calculateBestStreak(history: AnsweredQuestion[]): number {
    let best = 0;
    let current = 0;
    for (const item of history) {
      if (item.isCorrect) {
        current++;
        best = Math.max(best, current);
      } else {
        current = 0;
      }
    }
    return best;
  }
}