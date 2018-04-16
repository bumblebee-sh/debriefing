import {Component, OnInit} from '@angular/core';
import { UserService } from '@app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit{
  user: any;
  constructor(
    private userService: UserService
  ) {}
  ngOnInit() {
    this.user = this.userService.user_data;
  }
}
