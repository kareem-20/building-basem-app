import { ModalController } from '@ionic/angular';
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
  mapLocaion: { lat: number | null, lng: number | null } = { lat: null, lng: null };
  constructor(
    private modalCtrl: ModalController
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
      // forceCreate: true,
      config: {
        center: {
          lat: 30.5744705,
          lng: 31.5075989
        },
        zoom: 9
      }
    });
    this.addMarker()
  }

  ngOnInit() {

  }

  async addMarker() {
    const marker: Marker = {
      draggable: true,
      title: 'localhost',
      iconUrl: '../../../assets/images/pin.svg',
      coordinate: {
        lat: 30.5744705,
        lng: 31.5075989
      },
      snippet: "my Home",

    }
    await this.map.addMarker(marker)
    this.map.setOnMarkerDragEndListener(async (marker) => {
      console.log(marker);
      this.mapLocaion.lat = marker.latitude;
      this.mapLocaion.lng = marker.longitude;
    })
  }

  close() {
    console.log('close')
    this.modalCtrl.dismiss()
  }

  sumbit() {
    console.log('submit')
    this.modalCtrl.dismiss(this.mapLocaion)
  }

}
