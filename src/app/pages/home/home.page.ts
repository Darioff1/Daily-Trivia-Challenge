import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonBadge, IonSpinner } from '@ionic/angular/standalone';
import { TriviaService, TriviaQuestion } from '../../services/trivia.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonBadge, IonSpinner, CommonModule, NgFor, NgIf]
})
export class HomePage {

  question: TriviaQuestion | null = null;
  answers: string[] = [];
  selectedAnswer: string | null = null;
  isCorrect: boolean | null = null;
  loading = true;
  difficulty = 'medium';

  constructor(private triviaService: TriviaService, private storageService: StorageService) {}

  async ionViewWillEnter() {
    await this.storageService.init();
    await this.loadDifficulty();
    this.loadQuestion();
  }

  async loadDifficulty() {
    const settings = await this.storageService.getSettings();
    if (settings) this.difficulty = settings.difficulty;
  }

  loadQuestion() {
    this.loading = true;
    this.selectedAnswer = null;
    this.isCorrect = null;
    this.triviaService.fetchQuestion(1, this.difficulty).subscribe(response => {
      this.question = response.results[0];
      this.answers = [...this.question.incorrect_answers, this.question.correct_answer]
        .sort(() => Math.random() - 0.5);
      this.loading = false;
    });
  }

  async selectAnswer(answer: string) {
    if (this.selectedAnswer) return;
    this.selectedAnswer = answer;
    this.isCorrect = answer === this.question?.correct_answer;

    await this.storageService.saveAnswer({
      question: this.decodeHtml(this.question!.question),
      correctAnswer: this.decodeHtml(this.question!.correct_answer),
      selectedAnswer: this.decodeHtml(answer),
      isCorrect: this.isCorrect,
      category: this.decodeHtml(this.question!.category),
      difficulty: this.question!.difficulty,
      date: new Date().toLocaleDateString()
    });
  }

  decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
}