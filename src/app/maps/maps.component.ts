import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
})
export class MapsComponent implements OnInit {
  @ViewChild('divMap') divMap!: ElementRef;
  @ViewChild('inputPlaces') inputPlaces!: ElementRef;
  mapa!: google.maps.Map;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const opciones = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.cargarMapa(position);
          this.cargarAutocomplete();
        },
        (error) => {
          console.log('Error al obtener la ubicación actual:', error);
        },
        opciones
      );
    } else {
      console.log('El navegador no es compatible con la geolocalización');
    }
  }

  cargarMapa(position: any): void {
    const opciones = {
      center: new google.maps.LatLng(
        position.coords.latitude,
        position.coords.longitude
      ),
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.mapa = new google.maps.Map(
      this.renderer.selectRootElement(this.divMap.nativeElement),
      opciones
    );

    const markerPosition = new google.maps.Marker({
      position: this.mapa.getCenter(),
      title: 'Tu ubicación actual',
    });

    markerPosition.setMap(this.mapa);
  }

  cargarAutocomplete(): void {
    const autocomplete = new google.maps.places.Autocomplete(
      this.renderer.selectRootElement(this.inputPlaces.nativeElement),
      {
        componentRestrictions: {
          country: ['BO'], // Cambiar a 'BO' para resultados de Bolivia
        },
        fields: ['address_components', 'geometry', 'place_id'],
        types: ['address'],
      }
    );

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place: any = autocomplete.getPlace();
      console.log('El lugar completo es:', place);
      this.mapa.setCenter(place.geometry.location);
      const marker = new google.maps.Marker({
        position: place.geometry.location,
      });
      marker.setMap(this.mapa);
    });
  }
}
