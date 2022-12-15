import { AuthService } from './../../services/auth/auth.service';
import { HelpersService } from 'src/app/services/helpers/helpers.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userImage: string;
  userData: any;
  constructor(
    private navCtrl: NavController,
    private helper: HelpersService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userImage = this.authService.userData.image;
  }

  navigate(route: string) {
    this.helper.navigateForward(route)
  }
  back() {
    this.navCtrl.back()
  }



  logOut() {
    this.authService.logOut()
  }


}
