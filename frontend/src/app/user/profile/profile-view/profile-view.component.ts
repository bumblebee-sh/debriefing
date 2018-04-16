import { Component, OnInit } from '@angular/core';

import { UserService } from '@app/_services';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.user = this.userService.user_data;
  }

}
