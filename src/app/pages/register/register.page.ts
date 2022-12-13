import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { HelpersService } from 'src/app/services/helpers/helpers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form!: FormGroup;

  // userTypes:[]<userType> =[]
  userTypes: any[] = []
  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private dataService: DataService,
    private helper: HelpersService,
    private authService: AuthService
  ) {
    this.createForm()
  }

  ngOnInit() {
    this.getuserTypes();
    console.log(this.authService.userData);
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['', Validators.required]
    })
  }

  back() {
    this.navCtrl.back()
  }

  getuserTypes() {
    this.dataService.getData('/userType')
      .subscribe((res: any) => {
        this.userTypes = res
      }, (err) => {
        console.log(err);
        this.helper.presentToast(err.message)
      })
  }

  submit() {
    let body = this.form.value;
    console.log(this.authService.userData);

    if (this.authService.userData) {
      this.authService.updateUser(body)
    } else {
      this.authService.register(body)
    }

  }

  navigate(route: string) {
    this.navCtrl.navigateForward(route)
  }
}
