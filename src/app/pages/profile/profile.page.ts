import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataService } from '../../services/data/data.service';
import { HelpersService } from '../../services/helpers/helpers.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userId: any;
  userData: any;
  builds: any[] = [];
  constructor(
    private helper: HelpersService,
    private dataService: DataService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    // this.getDepartments(this.route.snapshot.params['id'])
    this.getData()
  }
  getData() {
    this.dataService.getData(`/build/${this.userId}`)
      .subscribe((res: any) => {
        console.log(res);
        this.userData = res['user']
        this.builds = res['builds']
      })
  }

  details(build: any) {
    this.dataService.addParams = { build }
    this.navCtrl.navigateForward('details')
  }
  back() {
    this.navCtrl.back()
  }

}
