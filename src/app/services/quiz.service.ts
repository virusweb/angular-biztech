import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) { }

  getQuizData(quiz) {
    return this.http.post<any>(`${environment.baseUrl}/quiz.php`, { quiz });
  }

  getResult(ans, quiz) {
    return this.http.post<any>(`${environment.baseUrl}/result.php`, { ans:ans, quiz:quiz });
  }
}
