import { useCallback, useState } from "react";
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

const libraries: Libraries = ["places"];

interface Props {
  markers: google.maps.LatLngLiteral
  onMarkerDragEnd: (e: google.maps.MapMouseEvent) => void
  onClickMap: (e: google.maps.MapMouseEvent) => void
  onMount?: () => void
  onMarkerClick?: (e: google.maps.MapMouseEvent) => void
  mapContainerStyle?: React.CSSProperties
}

export default function GoogleMaps(props: Props) {
  const { onMarkerDragEnd, onMarkerClick, mapContainerStyle, onClickMap, markers } = props;
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: libraries,
  });
  const [map, setMap] = useState<google.maps.Map>();

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(markers);
    map.fitBounds(bounds);
    map.setZoom(15);

    setMap(map);
  }, [markers]);

  const onUnmount = useCallback(function callback() {
    setMap(undefined);
  }, []);

  return isLoaded ? (
    <div className="w-100 position-relative">
      <AutocompleteGoogleMapInput map={map} />
      <GoogleMap
        onClick={(e) => {
          onClickMap(e)
        }}
        mapContainerStyle={mapContainerStyle || initialContainerStyle}
        center={markers}
        onLoad={onLoad}
        onUnmount={onUnmount}
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
