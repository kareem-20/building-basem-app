import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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

  constructor(private navCtrl: NavController) { }
  ngOnInit() { }

  navigate(route: string) {
    this.navCtrl.navigateForward(route)
  }
}
