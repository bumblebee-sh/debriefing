import { Component, OnInit } from '@angular/core';

import { UserService, SnackBarService } from '@app/_services';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent implements OnInit {
  model: any = {};
  image: any;
  img_text = 'Choose file...';
  img_err = false;
  profile = new FormData();
  constructor(
    private userService: UserService,
    private snackBarService: SnackBarService
  ) { }

  ngOnInit() {
    this.model = Object.assign({}, this.userService.user_data);
    this.model.birthday = new Date(this.model.birthday);
    this.profile.append('profile_img', '');
  }

  update_profile(f: HTMLFormElement) {
    this.model.birthday = new Date(this.model.birthday).getTime();
    this.profile.append('profile_info', JSON.stringify(this.model));
    this.userService.update_profile(this.profile).subscribe(
      res => {
        this.userService.check_session().subscribe(
          res => {
            // todo refresh data
            // this.userService.set_user_data = res.user;
          },
          err => console.log(err)
        );
        this.snackBarService.success('Profile updated');
      },
      err => console.log(err)
    );
  }

  image_pick(e) {
    this.img_err = false;
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.size > 1e+6) {
      this.img_err = true;
      return;
    }
    this.img_text = file.name;
    this.profile.append('profile_img', file);
  }
}
