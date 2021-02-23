import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { Place } from 'src/app/place';
import { MapServService } from 'src/app/services/map-serv.service';

@Component({
  selector: 'app-map3',
  templateUrl: './map3.component.html',
  styleUrls: ['./map3.component.css']
})
export class Map3Component implements OnInit {
  name!:string
  lat!:number
  lng!:number
  p!:Place

  constructor(private mapserv :MapServService) { }

  
 

 ngOnInit(): void {
  this.initMap()
  
}
initMap():void {
  // Create the map.
  //app.component.ts:86 31.8232844 35.1940757
  //app.component.ts:86 31.79412499999999 35.2100396
  //31.79713229999999 35.2102238
  //31.768379 35.184947
  //32.068424 34.824785
  //app.component.ts:86 32.083645 34.798119
  const pyrmont = { lat: 32.083645, lng: 34.798119 };
  const map = new google.maps.Map(
    document.getElementById("map") as HTMLElement,
    {
      center: pyrmont,
      zoom: 17,
      mapId: "8d193001f940fde3",
    } as google.maps.MapOptions
  );

  // Create the places service.
  const service = new google.maps.places.PlacesService(map);
  let getNextPage: () => void | false;
  const moreButton = document.getElementById("more") as HTMLButtonElement;

  moreButton.onclick = function () {
    moreButton.disabled = true;

    if (getNextPage) {
      getNextPage();
    }
  };

  // Perform a nearby search.
  service.nearbySearch(
    { location: pyrmont, radius: 1000, type: "store" },
    (
      results: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus,
      pagination: google.maps.places.PlaceSearchPagination | null
    ) => {
      if (status !== "OK" || !results) return;

      this.addPlaces(results, map);
      moreButton.disabled = !pagination || !pagination.hasNextPage;

      if (pagination && pagination.hasNextPage) {
        getNextPage = () => {
          // Note: nextPage will call the same handler function as the initial call
          pagination.nextPage();
        };
      }
    }
  );
  return console.log("finish to init map!")
}

 addPlaces(
  places: google.maps.places.PlaceResult[],
  map: google.maps.Map
) {
  const placesList = document.getElementById("places") as HTMLElement;

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
      console.log(place);
      const image = {
        url: place.icon!,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };

      new google.maps.Marker({
        map,
        icon: image,
        title: place.name!,
        position: place.geometry.location,
      });

      const li = document.createElement("li");
      li.textContent = place.name!;
    
      placesList.appendChild(li);

      li.addEventListener("click", () => {
        map.setCenter(place.geometry!.location!);
      });
      this.name=place.name!
      this.lat=place.geometry.location.lat()
      this.lng=place.geometry.location.lng()
      this.p=new Place()
      this.p.name=this.name;
      this.p.lat=this.lat;
      this.p.lan=this.lng;
      this.mapserv.add(this.p).subscribe(
        data=>{
          console.log(data)
        }
        ,error=>{
          console.error()
        }
      )

    }
  }
}

}
