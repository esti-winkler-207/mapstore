import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Place } from 'src/app/place';
import { MapServService } from 'src/app/services/map-serv.service';
declare var google: any;
@Component({
  selector: 'app-map',
  providers: [MessageService],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    map!: google.maps.Map 
 infoWindow!: google.maps.InfoWindow

  options: any;

  overlays!: any[];

  dialogVisible!: boolean;

  markerTitle!: any;

  selectedPosition: any;

  

  draggable!: boolean;

  constructor(private messageService: MessageService,private mapServService:MapServService,private route:Router) {}

  ngOnInit() {
      this.options = {
          center: {lat: 36.890257, lng: 30.707417},
          zoom: 12
      };

      this.initOverlays();

      this.infoWindow = new google.maps.InfoWindow();
      const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");

 this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.infoWindow.setPosition(pos);
         this. infoWindow.setContent("Location found.");
        this.  infoWindow.open(this.map);
         this. map.setCenter(pos);
        },
        () => {
         this. handleLocationError(true, this.infoWindow, this.map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.map.getCenter());
    }
  });
}

 handleLocationError(
  browserHasGeolocation: boolean,
  infoWindow: google.maps.InfoWindow,
  pos: google.maps.LatLng
) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(this.map);

  }

  handleMapClick(event:any) {
      this.dialogVisible = true;
      this.selectedPosition = event.latLng;
      console.log(this.selectedPosition)
  }

  handleOverlayClick(event:any) {
      let isMarker = event.overlay.getTitle != undefined;

      if (isMarker) {
          let title = event.overlay.getTitle();
          this.infoWindow.setContent('' + title + '');
          this.infoWindow.open(event.map, event.overlay);
          event.map.setCenter(event.overlay.getPosition());

          this.messageService.add({severity:'info', summary:'Marker Selected', detail: title});
      }
      else {
          this.messageService.add({severity:'info', summary:'Shape Selected', detail: ''});
      }
  }

  addMarker() {
      this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle, draggable: this.draggable}));
      this.markerTitle = null;
      this.dialogVisible = false;
      console.log(this.overlays);
      this.mapServService.place1.lat=this.selectedPosition.lat();
      this.mapServService.place1.lan=this.selectedPosition.lng();
      this.mapServService.place1.name=this.markerTitle;
      this.mapServService.add(this.mapServService.place1).subscribe(data=>{console.log(data),
        this.mapServService.place1=new Place()
        
    },err=>{console.log("ooops!!!")})

      
  }

  handleDragEnd(event:any) {
      this.messageService.add({severity:'info', summary:'Marker Dragged', detail: event.overlay.getTitle()});
  }

  initOverlays() {
      if (!this.overlays||!this.overlays.length) {
          this.overlays = [
              new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
              new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
              new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"}),
              new google.maps.Polygon({paths: [
                  {lat: 36.9177, lng: 30.7854},{lat: 36.8851, lng: 30.7802},{lat: 36.8829, lng: 30.8111},{lat: 36.9177, lng: 30.8159}
              ], strokeOpacity: 0.5, strokeWeight: 1,fillColor: '#1976D2', fillOpacity: 0.35
              }),
              new google.maps.Circle({center: {lat: 36.90707, lng: 30.56533}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
              new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
          ];
      }
  }

  zoomIn(map:any) {
      map.setZoom(map.getZoom()+1);
  }

  zoomOut(map:any) {
      map.setZoom(map.getZoom()-1);
  }

  clear() {
      this.overlays = [];
  }

}
