import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/Service/backend.service';
import { Question } from 'src/app/Model/Question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {
  questionList: Question[];

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getQuestions().subscribe(
      (response) => {
        //Next callback
        console.log('response received');
        console.log(response);
        this.questionList = response;
      },
      (error) => {
        //Error callback
        console.error('Request failed with error');
        alert(error);
      },
      () => {
        //Complete callback
        console.log('Request completed');
      }
    );
  }
}
