import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-quizzes',
  templateUrl: './profile-quizzes.component.html',
  styleUrls: ['./profile-quizzes.component.scss']
})
export class ProfileQuizzesComponent implements OnInit {
  @Input() quizzes: any;
  url_part: any;
  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    let _url = this.route.url;
    if (_url.indexOf('#') + 1) {
      _url = _url.replace(window.location.hash, '');
    }
    this.url_part = _url.replace('profile', '');
  }

}
