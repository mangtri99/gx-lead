import { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  Libraries,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { GOOGLE_MAP_API_KEY } from "../../config/general";
import AutocompleteGoogleMapInput from "../Input/AutocompleteGoogleMapInput";

// initial map container style
const initialContainerStyle = {
  width: "100%",
  height: "400px",
};

// initial center of the map
const initialCenter = {
  lat: -8.663925503014124,
  lng: 115.16680302948615,
};

const libraries: Libraries = ["places"];

interface Props {
  onMarkerDragEnd: (e: google.maps.MapMouseEvent) => void
  onClickMap: (e: google.maps.MapMouseEvent) => void
  onMarkerClick?: (e: google.maps.MapMouseEvent) => void
  mapContainerStyle?: React.CSSProperties
}

export default function GoogleMaps(props: Props) {
  const { onMarkerDragEnd, onMarkerClick, mapContainerStyle, onClickMap } = props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: libraries,
  });
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral>(initialCenter);
  const [map, setMap] = useState<google.maps.Map>();

  // get currentLocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);
        setMarkers({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      // console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(markers);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(undefined);
  }, []);

  return isLoaded ? (
    <div className="w-100 position-relative">
      <AutocompleteGoogleMapInput map={map} />
      <GoogleMap
        onClick={(e) => {
          // set marker
          setMarkers({
            lat: e.latLng?.lat() || initialCenter.lat,
            lng: e.latLng?.lng() || initialCenter.lng,
          });
          onClickMap(e)
        }}
        mapContainerStyle={mapContainerStyle || initialContainerStyle}
        center={markers}
        onLoad={onLoad}
        onUnmount={onUnmount}
        zoom={15}
      >
        <Marker
          position={markers}
          draggable
          onClick={onMarkerClick}
          onDragEnd={onMarkerDragEnd}
        />
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
