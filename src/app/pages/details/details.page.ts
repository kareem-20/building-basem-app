import { DataService } from 'src/app/services/data/data.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SwiperComponent } from "swiper/angular";

import SwiperCore, { Pagination, Navigation } from "swiper";
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsPage implements OnInit, OnDestroy {
  build: any;
  constructor(
    private navCtrl: NavController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.build = this.dataService.myParams.build;
    console.log(this.build);
  }

  call(number: any) {
    window.open(`tel:${number}`)
  }

  whatsapp(number: any) {
    window.open(`https://wa.me/${number}`, 'blank')
  }
  openMap() {

  }
  back() {
    this.navCtrl.back()
  }
  ngOnDestroy(): void {
    this.dataService.addParams = {}
  }
}
