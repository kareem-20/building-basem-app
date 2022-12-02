import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavController } from '@ionic/angular';
import SwiperCore, { Pagination, Navigation } from "swiper";
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddPage implements OnInit {

  constructor(
    private navCtrl: NavController

  ) { }

  ngOnInit() {
  }


  back() {
    this.navCtrl.back()
  }

}
