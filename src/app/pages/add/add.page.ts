import { AuthService } from './../../services/auth/auth.service';
import { HelpersService } from 'src/app/services/helpers/helpers.service';
import { CameraService } from './../../services/camera/camera.service';
import { DataService } from 'src/app/services/data/data.service';
import { forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  form: FormGroup = new FormGroup({});
  buildTypes: any[] = []
  bondTypes: any[] = []
  adTypes: any[] = []
  adStatus: any[] = []
  adGender: any[] = []
  citys: any[] = []
  images: any[] = [];
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private cameraService: CameraService,
    private helper: HelpersService,
    private authService: AuthService
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
}
