import { Component, OnInit, TemplateRef } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  qno = 0;
  test: any;
  questions: any;
  ans = [];
  modalRef: BsModalRef;
  name: string;
  correct: number;
  wrong: number;
  unattempt: number;
  total: number;

  constructor(private qz: QuizService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getQuizData('angular');
  }

  getQuizData(name): void {
    this.ans = [];
    this.qz.getQuizData(name).subscribe(res => {
      this.test = res.data;
      this.questions = res.data.questions;
      this.questions.forEach((t, k) => {
        this.ans[k] = null;
      });
    });
  }

  submit(template: TemplateRef<any>): void {
    this.qz.getResult(this.ans, this.test.test_id).subscribe(res => {
      if (res && res.data) {
        this.total = res.data.total;
        this.wrong = res.data.wrong;
        this.unattempt = res.data.un_attempt;
        this.correct = res.data.correct;
        this.name = res.data.test_name;
        this.modalRef = this.modalService.show(template);
      }
    });
  }
}
