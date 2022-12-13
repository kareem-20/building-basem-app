import { MapPage } from './../map/map.page';
import { LocationService } from './../../services/location/location.service';
import { AuthService } from './../../services/auth/auth.service';
import { HelpersService } from 'src/app/services/helpers/helpers.service';
import { CameraService } from './../../services/camera/camera.service';
import { DataService } from 'src/app/services/data/data.service';
import { forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AnimationController, IonModal, ModalController, NavController } from '@ionic/angular';
import SwiperCore, { Pagination, Navigation } from "swiper";
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddPage implements OnInit {
  @ViewChild('modal') modal: IonModal;
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;

  form: FormGroup = new FormGroup({});
  buildTypes: any[] = []
  bondTypes: any[] = []
  adTypes: any[] = []
  adStatus: any[] = []
  adGender: any[] = []
  citys: any[] = []
  images: any[] = [];
  currentLocation: {} | null = null;
  locationType: string | null = null;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private cameraService: CameraService,
    private helper: HelpersService,
    private authService: AuthService,
    private animationCtrl: AnimationController,
    private locationService: LocationService,
    private modalController: ModalController
  ) {
    this.createForm()
  }

  ngOnInit() {

    this.getTypes()
  }

  getTypes() {
    forkJoin([
      this.dataService.getData('/buildType'),
      this.dataService.getData('/bondType'),
      this.dataService.getData('/adType'),
      this.dataService.getData('/adStatus'),
      this.dataService.getData('/adGender'),
      this.dataService.getData('/citys'),
    ]).subscribe((res: any[]) => {
      console.log(res);
      this.buildTypes = res[0]
      this.bondTypes = res[1]
      this.adTypes = res[2]
      this.adStatus = res[3]
      this.adGender = res[4]
      this.citys = res[5]
    })
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      address: [''],
      price: [''],
      area: [''],
      roomsNumber: [''],
      bedsNumber: [''],
      bathroomNumber: [''],
      buildYear: [''],
      description: [''],
      phoneCall: [''],
      whatsapp: [''],
      bondType: [''],
      adType: [''],
      adStatus: [''],
      adGender: [''],
      buildType: ['', Validators.required],
      city: ['']
    })
  }

  back() {
    this.navCtrl.back()
  }
  selectImage() {
    console.log('clicked');
    this.cameraService.showActionSheet().then((val) => {
      this.images.push(val)
    })
  }

  async getCurrentLocation() {
    this.locationType = 'current';
    this.locationService.getCurrentLocation().then(val => {
      this.currentLocation = val;
      console.log(val);
      this.helper.presentToast('تم تحديد موقعك بنجاح')
    })
  }


  getMapLocation() {
    this.locationType = 'map';
  }

  async submit() {
    let images = await this.cameraService.uploadImages(this.images)
    let body = {
      images,
      ...this.form.value,
      user: this.authService.userData?._id
    }
    // console.log(body);
    this.dataService.postData('/build', body).subscribe((res) => {
      console.log('res', res);
      this.navCtrl.pop();
      this.helper.presentToast('تم اضافة الاعلان بنجاح')
    })
  }

  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root?.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(200)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };

  async openMap() {
    const modal = await this.modalController.create({
      component: MapPage,
      animated: true,
      cssClass: 'modal-map',
      enterAnimation: this.enterAnimation,
      leaveAnimation: this.leaveAnimation
    })
    modal.present()
  }

  // closeModel() {
  //   this.modal.dismiss();
  // }
}
