import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../Model/Question';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  baseURL: string = 'http://localhost:9090/api/questions';

  //questions: Question[];

  constructor(private http: HttpClient) {}

  public getQuestions() {
    return this.http.get<any>(this.baseURL, { responseType: 'json' });
  }
}
