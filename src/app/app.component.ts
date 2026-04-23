import { Component } from '@angular/core';
import { IonApp, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, time, statsChart, settings } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonTabBar, IonTabButton, IonTabs, IonIcon, IonLabel],
})
export class AppComponent {
  constructor() {
    addIcons({ home, time, statsChart, settings });
  }
}