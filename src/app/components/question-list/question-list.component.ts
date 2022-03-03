import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/Service/backend.service';
import { Question } from 'src/app/Model/Question';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {
  questionList: Question[];

  public checkBoxForm = new FormGroup({ questionsArray: new FormArray([]) });

  constructor(private backendService: BackendService) {}

  ngOnInit() {
    this.backendService.getQuestions().subscribe(
      (response) => {
        //Next callback
        //console.log('response received');
        //console.log(response);
        this.questionList = response;
        for (let x in this.questionList) {
          console.log(this.questionList[x].options);
          (<FormArray>this.checkBoxForm.get('questionsArray')).push(
            new FormGroup({
              qname: new FormControl(this.questionList[x].qname),
              options: new FormArray(
                this.loadOptions(this.questionList[x].options)
              ),
            })
          );
        }
      },
      (error) => {
        //Error callback
        //console.error('Request failed with error');
        alert(error);
      },
      () => {
        //Complete callback
        //console.log('Request completed');
      }
    );
  }

  loadOptions(arr) {
    let controls = [];
    const array = arr.map((option) => {
      //console.log(option);
      return new FormControl(option)
    });

    for (let x in arr) {
      console.log(arr[x].optValue);
      controls.push(
        new FormGroup({
          select: new FormControl(arr[x].optValue),
        })
      );
    }

    return controls;
  }

  submit(form) {
    console.log('Hi');
  }

  returnQuestionsArray() {
    console.log(this.checkBoxForm.get('questionsArray')['controls']);
    return this.checkBoxForm.get('questionsArray')['controls'];
  }

  returnOptions(x) {
    console.log(x.get('options').controls);
    return x.get('options').controls;
  }
}
