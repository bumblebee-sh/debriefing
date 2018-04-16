import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/_services';

@Component({
  selector: 'app-profile-aside',
  templateUrl: './profile-aside.component.html',
  styleUrls: ['./profile-aside.component.scss']
})
export class ProfileAsideComponent implements OnInit {
  model: any;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.model = this.userService.user_data;
  }

}
