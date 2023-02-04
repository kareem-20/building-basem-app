import { DataService } from './../../services/data/data.service';
import { LocationService } from './../../services/location/location.service';
import { ModalController, NavController } from '@ionic/angular';
import { environment } from './../../../environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  // @ViewChild('map') mapRef: ElementRef;
  map: GoogleMap;
  myLocation: any;
  mapLocaion: { lat: number | null, lng: number | null } = { lat: null, lng: null };

  @ViewChild('map', { static: true }) mapRef: ElementRef;

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
    // this.map = await GoogleMap.create({
    //   id: 'map',
    //   apiKey: environment.mapskey,
    //   element: this.mapRef.nativeElement,
    //   forceCreate: true,
    //   config: {
    //     center: {
    //       lat: this.myLocation.lat,
    //       lng: this.myLocation.lng
    //     },
    //     zoom: 9
    //   }
    // }, (err) => {
    //   console.log(err);
    // })
    // this.addMarker()

    let latLng = new google.maps.LatLng(this.myLocation.lat, this.myLocation.lng);
    let options = {
      center: latLng,
      zoom: 15,
      // mapTypeId: "roadmap",
    }
    let markers: google.maps.Marker[] = [];

    let map = new google.maps.Map(this.mapRef.nativeElement, options);
    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // searchBox.addListener
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      console.log(places);
      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place: any) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon as string,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        let marker = new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
          draggable: true,
        })
        // Create a marker for each place.
        marker.addListener('dragend', () => {
          this.mapLocaion = {
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng(),
          }
        })
        markers.push(marker);
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });



    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {

      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);

    });

    this.addMarker(map, latLng)

  }
  addMarker(map: any, position: any) {
    // const markImage = '../../../assets/Icon&Svg/8.my location/svg/pin_big.svg';

    let marker = new google.maps.Marker({
      map,
      position,
      draggable: true,
      // icon: markImage
    })

    marker.addListener('dragend', () => {
      this.mapLocaion = {
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
      }
    })


  }


  ngOnInit() {
    this.myLocation = this.locationService.currentLocation
  }

  // async addMarker() {
  //   const marker: Marker = {
  //     draggable: true,
  //     title: 'localhost',
  //     coordinate: {
  //       lat: this.myLocation.lat,
  //       lng: this.myLocation.lng
  //     },
  //     snippet: "my Home",
  //   }
  //   console.log(this.myLocation);

  //   await this.map.addMarker(marker)
  //   this.map.setOnMarkerDragEndListener(async (marker) => {
  //     console.log(marker);
  //     this.mapLocaion.lat = marker.latitude;
  //     this.mapLocaion.lng = marker.longitude;
  //   })
  // }

  close() {
    console.log('close')
    // this.modalCtrl.dismiss()
    this.navCtrl.navigateBack('/add');
    this.map.destroy()

  }
  setCurrentLocation() {
    this.mapLocaion = this.myLocation
    this.sumbit()
  }
  sumbit() {
    console.log('submit')
    this.dataService.addParams = { mapLocation: this.mapLocaion }
    this.navCtrl.navigateBack('/add')
    // this.map.destroy()

    // this.modalCtrl.dismiss(this.mapLocaion)
  }

}
