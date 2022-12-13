import { DataService } from './../../services/data/data.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {

  typeBuild: any;
  loading: boolean = true
  errorView: boolean = false
  emptyView: boolean = false
  searchQuery: string = '';
  disableInfinity: boolean = false;
  skip: number = 0;
  building: any[] = []
  searchbarShow = true;
  constructor(
    private navCtrl: NavController,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.typeBuild = this.dataService.myParams.type;
    this.getBuilds()
  }

  getBuilds(ev?: any) {
    this.dataService.getData(this.endPoint)
      .subscribe((res: any) => {
        console.log(res);
        this.building = this.skip ? this.building.concat(res) : res;
        this.building.length ? this.showContentView(ev) : this.showEmptyView(ev);
        this.disableInfinity = res?.length != 20
      }, (err) => {
        this.showErrorView(ev)
      })
  }

  back() {
    this.navCtrl.back()
  }


  get endPoint(): string {
    let url = '/build/'
    url += `&buildType=${this.typeBuild._id}`
    if (this.skip) url += `&skip=${this.skip}`;
    // if (this.date) url += `&date=${this.date}`;
    // if (this.from) url += `&from=${new Date(this.from).getTime()}`;
    // if (this.from && this.to) url += `&to=${new Date(this.to).getTime()}`;
    // url
    return url.replace('&', '?');
  }
  onSearchChange(ev?: Event) {
    console.log(ev);
    console.log(this.searchQuery);
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

  ionViewDidLeave() {
    this.dataService.addParams = {}
  }
}
