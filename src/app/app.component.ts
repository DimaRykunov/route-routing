import { Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import { User, Way } from './way';

import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [  ]
})
export class AppComponent implements OnInit {
  public latitude1: number;
  public longitude1: number;
  public latitude2: number;
  public longitude2: number;
  public searchControl: FormControl;
  public zoom: number;
  public ng_address1: string;
  public ng_address2: string;
  public dir: Way = {
    origin : {lat : 0, lng : 0},
    destination : {lat : 0, lng : 0}
  };

  @ViewChild('search1')
  public searchElementRef1: ElementRef;
  @ViewChild('search2')
  public searchElementRef2: ElementRef;
  constructor(
    private mapsAPILoader1: MapsAPILoader,
    private mapsAPILoader2: MapsAPILoader,
    private ngZone: NgZone,

  ) {}

  ngOnInit() {
    this.zoom = 4;
    this.latitude1 = 39.8282;
    this.longitude1 = -98.5795;
    this.latitude2 = 39.8282;
    this.longitude2 = -98.5795;

    this.searchControl = new FormControl();


    // подгруажает текст в input при печатании символа
    this.mapsAPILoader1.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef1.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {

          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude1 = place.geometry.location.lat();
          this.longitude1 = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
// подгруажает текст в input2 при печатании символа
    this.mapsAPILoader2.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef2.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude2 = place.geometry.location.lat();
          this.longitude2 = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  //собирает текст с инпутов, перводит в координаты и координаты заносятся в dir
  private geocodeAddress() {
    console.log(this.dir.origin, this.dir.destination);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': this.ng_address1}, function(results, status) {
      if (status.toString() === 'OK') {
        this.dir.origin.lat = results[0].geometry.location.lat;
        this.dir.origin.lng = results[0].geometry.location.lng;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
    geocoder.geocode({'address': this.ng_address2}, function(results, status) {
      if (status.toString() === 'OK') {
        this.dir.destination.lat = results[0].geometry.location.lat;
        this.dir.destination.lng = results[0].geometry.location.lng;
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}
