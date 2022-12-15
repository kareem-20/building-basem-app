import { AuthService } from './../services/auth/auth.service';
import { DataService } from './../services/data/data.service';
import { HelpersService } from 'src/app/services/helpers/helpers.service';
import { IonModal, IonPopover, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from "swiper/angular";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { forkJoin } from 'rxjs';
SwiperCore.use([Navigation, Pagination]);


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePage implements OnInit {
  @ViewChild('modal') filterModal: IonModal;
  userImage: string;
  @ViewChild('popover') popover: IonPopover;
  isOpen = false;
  buildTypes: any[] = []
  builds: any[] = [];
  skip: number = 0;
  loading: boolean = true
  errorView: boolean = false
  emptyView: boolean = false
  disableInfinity: boolean = false;
  searchQuery: string = '';


  /// filter data
  bondTypes: any[] = []
  adTypes: any[] = []
  adStatuss: any[] = []
  adGenders: any[] = []
  citys: any[] = [];

  /// filter values
  city: string | null = null;
  adStatus: string | null = null;
  adGender: string | null = null;
  adType: string | null = null;
  bondType: string | null = null;

  constructor(
    private helper: HelpersService,
    private dataService: DataService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getTypes();
    this.getBuilds();
    this.getdataFilters();
  }

  ionViewWillEnter() {
    this.userImage = this.authService.userData.image;
  }
  getTypes() {
    this.dataService.getData('/buildType')
      .subscribe((res: any) => {
        this.buildTypes = res
      })
  }

  getBuilds(ev?: any) {
    this.dataService.getData(this.endPoint)
      .subscribe((res: any) => {
        console.log(res);
        this.builds = this.skip ? this.builds.concat(res) : res;
        this.builds.length ? this.showContentView(ev) : this.showEmptyView(ev);
        this.disableInfinity = res?.length != 20
      }, (err) => {
        this.showErrorView(ev)
      })
  }

  getdataFilters() {
    forkJoin([
      this.dataService.getData('/citys'),
      this.dataService.getData('/bondType'),
      this.dataService.getData('/adType'),
      this.dataService.getData('/adStatus'),
      this.dataService.getData('/adGender'),
    ]).subscribe((res: any[]) => {
      console.log(res);
      this.citys = res[0]
      this.bondTypes = res[1]
      this.adTypes = res[2]
      this.adStatuss = res[3]
      this.adGenders = res[4]
    })
  }
  get endPoint(): string {
    let url = '/build/'
    if (this.skip) url += `&skip=${this.skip}`;
    if (this.searchQuery) url += `&searchText=${this.searchQuery}`;
    if (this.city) url += `&city=${this.city}`;
    if (this.adStatus) url += `&adStatus=${this.adStatus}`;
    if (this.adGender) url += `&adGender=${this.adGender}`;
    if (this.adType) url += `&adType=${this.adType}`;
    if (this.bondType) url += `&bondType=${this.bondType}`;
    return url.replace('&', '?');
  }

  onSearchChange(ev?: Event) {
    this.getBuilds()
  }

  trackFu(build: any) {
    return build?._id
  }

  doRefresh(ev: any) {
    this.skip = 0
    this.getBuilds(ev);
  }

  loadData(ev: any) {
    this.skip += 1
    this.getBuilds(ev);
  }

  showContentView(ev?: any) {
    this.loading = false;
    this.errorView = false;
    this.emptyView = false;
    this.disableInfinity = false;
    if (ev) ev.target.complete();
  }

  showErrorView(ev?: any) {
    this.loading = false;
    this.errorView = true;
    this.emptyView = false;
    if (ev) ev.target.complete();
  }

  showEmptyView(ev?: any) {
    this.loading = false;
    this.errorView = false;
    this.emptyView = true;
    if (ev) ev.target.complete();
  }
  navigate(route: string) {
    this.helper.navigateForward(route)
  }

  detailsType(type: any) {
    this.dataService.addParams = { type };
    this.helper.navigateForward('category')
  }
  detailsBuild(build: any) {
    this.dataService.addParams = { build }
    this.helper.navigateForward('details')
  }
  addBuild() {
    if (this.authService.userData?.username) {
      this.helper.navigateForward('add')

    } else {
      this.helper.presentToast('يجب تسجيل بياناتك اولا')
      this.helper.navigateForward('register')
    }
  }

  profile() {
    if (this.authService.userData?.username) {
      this.helper.navigateForward('profile')
    } else {
      this.helper.presentToast('يجب تسجيل بياناتك اولا')
      this.helper.navigateForward('register')
    }
  }

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  async filter() {
    await this.filterModal.present()
  }

  clearFilter() {
    this.adGender = null;
    this.adStatus = null;
    this.adType = null;
    this.bondType = null;
    this.city = null;
    this.filterModal.dismiss();
    this.getBuilds();
  }


  logOut() {
    this.authService.logOut()
  }


}
