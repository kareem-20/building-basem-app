// import { HelpersService } from './../helpers/helpers.service';
// import { Injectable } from '@angular/core';
// import { NavController } from '@ionic/angular';
// import { Storage } from '@ionic/storage-angular';
// import { from } from 'rxjs';
// import { DataService } from '../data/data.service';

// const COMPANY = 'Qsystem_company';
// const ACCESS_TOKEN = 'accessToken_Qsystem_company';
// const REFRESH_TOKEN = 'refreshToken_Qsystem_company';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor(
//     private dataService: DataService,
//     private storage: Storage,
//     private helper: HelpersService,
//     private navCtrl: NavController,
//   ) { }

//   getAccessToken() {
//     return localStorage.getItem(ACCESS_TOKEN);
//   }

//   removeCredentials() {
//     localStorage.removeItem(ACCESS_TOKEN);
//     this.storage.remove('taboor_url');

//     // localStorage.removeItem('isEmployee');

//     return Promise.all([
//       this.storage.remove(COMPANY),
//       this.storage.remove(REFRESH_TOKEN),
//     ]);
//   }

//   private get refreshEndPoint(): string {

//     return
//   }

//   getRefreshToken() {
//     let promise = new Promise(async (resolve, reject) => {
//       let token = await this.storage.get(REFRESH_TOKEN);
//       this.dataService
//         .getData('/company/refreshToken?token=' + token)
//         .subscribe(
//           (res: any) => {
//             localStorage.setItem(ACCESS_TOKEN, res.accessToken);
//             resolve(res.token);
//           },
//           (e) => reject(e)
//         );
//     });
//     return from(promise);
//   }

//   login(body: any) {
//     this.helper.showLoading();
//     this.dataService.postData('/company/login', body).subscribe(
//       async (user: any) => {
//         await this.storage.set(COMPANY, user);
//         await this.storage.set(REFRESH_TOKEN, user.refreshToken);
//         localStorage.setItem(ACCESS_TOKEN, user.accessToken);
//         this.helper.dismissLoading();
//         this.navCtrl.navigateForward('/home');
//       },
//       (err) => {
//         this.helper.dismissLoading();
//         if (err.status == 404)
//           return this.helper.presentToast(
//             'خطأ برقم الهاتف او كلمة المرور'
//           );

//         // if (err.status == 403)
//         //   return this.helper.presentToast(
//         //     'لقد تم تعطيل حسابك برجاء التواصل مع الشركة'
//         //   );
//         return this.helper.presentToast('خطأ بالشبكة');
//       }
//     );
//   }

//   async logOut() {
//     this.helper.showLoading();
//     await this.removeCredentials();
//     this.helper.dismissLoading();
//     this.navCtrl.navigateRoot('/login');
//   }
// }
