import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { StorageService, AnsweredQuestion } from '../../services/storage.service';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, CommonModule, NgIf, NgFor]
})
export class HistoryPage implements OnInit {

  history: AnsweredQuestion[] = [];

  constructor(private storageService: StorageService) {
    addIcons({ checkmarkCircle, closeCircle });
  }

  async ngOnInit() {
    await this.storageService.init();
    this.history = (await this.storageService.getHistory()).reverse();
  }
}