import { Share } from '@capacitor/share';
import { LocationService } from './../../services/location/location.service';
import { DataService } from 'src/app/services/data/data.service';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { SwiperComponent } from "swiper/angular";
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

import SwiperCore, { Pagination, Navigation } from "swiper";
import { MapPage } from '../map/map.page';
SwiperCore.use([Pagination, Navigation]);
import { Browser } from '@capacitor/browser';
import { HelpersService } from 'src/app/services/helpers/helpers.service';

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
    private dataService: DataService,
    private modalController: ModalController,
    private locationService: LocationService,
    private actionSheetCtrl: ActionSheetController,
    private clipboard: Clipboard,
    private helper: HelpersService
  ) { }

  ngOnInit() {
    this.build = this.dataService.myParams.build;
    console.log(this.build);
  }

  call(number: any) {
    window.open(`tel:${number}`)
  }

  async whatsapp(number: any) {
    await Browser.open({ url: `https://wa.me/+964${number}` });
  }

  async openMap(location: any) {
    let currentLocation = this.locationService.currentLocation;
    // window.open(`https://www.google.com/maps/dir/${currentLocation.lat},${currentLocation.lng}/${location.lng},${location.lat}`, "_system")
    await Browser.open({ url: `https://www.google.com/maps/dir/${currentLocation.lat},${currentLocation.lng}/${location[1]},${location[0]}` });
  }

  back() {
    this.navCtrl.back()
  }
  ngOnDestroy(): void {
    this.dataService.addParams = {}
  }



  async share() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'مشاركة الحساب',
      mode: 'ios',
      buttons: [
        {
          text: 'نسخ الرابط',
          icon: 'copy-outline',
          handler: () => {
            this.copyLink()
          }
        },
        {
          text: 'مشاركة الاعلان مباشرة',
          icon: 'share-outline',
          handler: async () => {
            await Share.share({
              url: `${this.dataService.baseURL}/build/details/${this.build._id}`,
              title: "تطبيق عثارك"
            }).catch((reason) => {
              console.log(reason);

            })
          }
        },
        {
          text: 'الغاء',
          icon: 'close-outline',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
    });
    await actionSheet.present();
  }

  copyLink() {
    console.log('clicked');
    this.clipboard.copy(`${this.dataService.baseURL}/build/details/${this.build._id}`).then((val) => {
      this.helper.presentToast('تم نسخ الرابط')
    });
  }
  toProfile() {
    this.navCtrl.navigateForward(`/profile/${this.build.userId._id}`)
  }
}
