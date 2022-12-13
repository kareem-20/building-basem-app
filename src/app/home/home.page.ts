import { AuthService } from './../services/auth/auth.service';
import { DataService } from './../services/data/data.service';
import { HelpersService } from 'src/app/services/helpers/helpers.service';
import { IonPopover, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Navigation, Pagination } from "swiper";
SwiperCore.use([Navigation, Pagination]);


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  @ViewChild('popover') popover: IonPopover;
  isOpen = false;
  buildTypes: any[] = []
  constructor(
    private helper: HelpersService,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getTypes()
  }

  getTypes() {
    this.dataService.getData('/buildType')
      .subscribe((res: any) => {
        this.buildTypes = res
      })
  }

  navigate(route: string) {
    this.helper.navigateForward(route)
  }

  details(type: any) {
    this.dataService.addParams = { type };
    this.helper.navigateForward('category')
  }

  addBuild() {
    if (this.authService.userData?.username) {
      this.helper.navigateForward('add')

    } else {
      this.helper.presentToast('يجب تسجيل بياناتك اولا')
      this.helper.navigateForward('register')
    }
  }

  profile() {
    if (this.authService.userData?.username) {
      this.helper.navigateForward('profile')
    } else {
      this.helper.presentToast('يجب تسجيل بياناتك اولا')
      this.helper.navigateForward('register')
    }
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }


  logOut() {
    this.authService.logOut()
  }


}
