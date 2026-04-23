import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TriviaQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaResponse {
  response_code: number;
  results: TriviaQuestion[];
}

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  private apiUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) {}

  fetchQuestion(amount: number = 1, difficulty: string = 'medium'): Observable<TriviaResponse> {
    return this.http.get<TriviaResponse>(`${this.apiUrl}?amount=${amount}&difficulty=${difficulty}&type=multiple`);
  }
}