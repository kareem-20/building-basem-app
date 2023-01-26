import { DataService } from './../../services/data/data.service';
import { LocationService } from './../../services/location/location.service';
import { ModalController, NavController } from '@ionic/angular';
import { environment } from './../../../environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;
  myLocation: any;
  mapLocaion: { lat: number | null, lng: number | null } = { lat: null, lng: null };
  constructor(
    private modalCtrl: ModalController,
    private locationService: LocationService,
    private navCtrl: NavController,
    private dataService: DataService
  ) {

  }

  ionViewDidEnter() {
    this.createMap()
  }
  ionViewDidLeave() {

  }

  async createMap() {
    this.map = await GoogleMap.create({
      id: 'map',
      apiKey: environment.mapskey,
      element: this.mapRef.nativeElement,
      forceCreate: true,
      config: {
        center: {
          lat: this.myLocation.lat,
          lng: this.myLocation.lng
        },
        zoom: 9
      }
    }, (err) => {
      console.log(err);

    })


    this.addMarker()
  }

  ngOnInit() {
    this.myLocation = this.locationService.currentLocation
  }

  async addMarker() {
    const marker: Marker = {
      draggable: true,
      title: 'localhost',
      // iconUrl: '../../../assets/images/pin.svg',
      coordinate: {
        lat: this.myLocation.lat,
        lng: this.myLocation.lng
      },
      snippet: "my Home",
    }
    console.log(this.myLocation);

    await this.map.addMarker(marker)
    this.map.setOnMarkerDragEndListener(async (marker) => {
      console.log(marker);
      this.mapLocaion.lat = marker.latitude;
      this.mapLocaion.lng = marker.longitude;
    })
  }

  close() {
    console.log('close')
    // this.modalCtrl.dismiss()
    this.navCtrl.navigateBack('/add');
    this.map.destroy()

  }

  sumbit() {
    console.log('submit')
    this.dataService.addParams = { mapLocation: this.mapLocaion }
    this.navCtrl.navigateBack('/add')
    this.map.destroy()

    // this.modalCtrl.dismiss(this.mapLocaion)
  }

}
