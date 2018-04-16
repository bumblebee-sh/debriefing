import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { QuizService } from '@app/_services';

@Component({
  selector: 'app-delete-interrogation',
  templateUrl: './delete-interrogation.component.html',
  styleUrls: ['./delete-interrogation.component.scss']
})
export class DeleteInterrogationComponent implements OnInit {
  title: any;
  _id: any;

  constructor(
    public bsModalRef: BsModalRef,
    private quizService: QuizService
  ) { }

  ngOnInit() {
  }

  delete_item() {
    this.quizService.delete_quiz(this._id).subscribe(
      res => this.bsModalRef.hide(),
      err => console.log(err)
    );
  }
}
