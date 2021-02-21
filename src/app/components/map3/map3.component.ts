import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-map3',
  templateUrl: './map3.component.html',
  styleUrls: ['./map3.component.css']
})
export class Map3Component implements OnInit {

  constructor() { }

  
 

 ngOnInit(): void {
  this.initMap()
  
}
initMap() {
  // Create the map.
  const pyrmont = { lat: -33.866, lng: 151.196 };
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
    { location: pyrmont, radius: 500, type: "store" },
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
}

 addPlaces(
  places: google.maps.places.PlaceResult[],
  map: google.maps.Map
) {
  const placesList = document.getElementById("places") as HTMLElement;

  for (const place of places) {
    if (place.geometry && place.geometry.location) {
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
    }
  }
}

}
