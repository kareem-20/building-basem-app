import { AuthService } from '../../services/auth/auth.service';
import { HelpersService } from 'src/app/services/helpers/helpers.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

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
    this.userData = this.authService.userData
    this.userImage = this.authService.userData.image;
  }

  navigate(route: string) {
    this.helper.navigateForward(route)
  }
  back() {
    this.navCtrl.navigateBack('/home')
  }



  logOut() {
    this.authService.logOut()
  }

}
