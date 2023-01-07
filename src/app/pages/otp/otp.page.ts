import { NavController } from '@ionic/angular';
import { HelpersService } from './../../services/helpers/helpers.service';
import { DataService } from 'src/app/services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { parsePhoneNumber } from 'libphonenumber-js';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  phone: any;
  constructor(
    private dataService: DataService,
    private helper: HelpersService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  back() {
    this.navCtrl.pop()
  }

  validPhoneNumber(number: string) {
    return parsePhoneNumber(number, `IQ`);
  }

  sendOtp() {
    if (!this.validPhoneNumber(this.phone).isValid()) this.helper.presentToast('رقم الهاتف غير صالح')
    else
      this.dataService.postOtp('/send', { phone: this.phone })
        .subscribe((res: any) => {
          this.dataService.addParams = { phone: this.phone }
          localStorage.setItem('otpId', res.verificationId);
          this.helper.presentToast('تم ارسال الكود بنجاح')
          this.navCtrl.navigateForward('/otp-vertify')
          console.log(res);
        })
  }
}
