import { useCallback, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { RiGoogleFill } from "react-icons/ri";

interface Props {
  map: google.maps.Map | undefined;
  onChangePlace?: (place: google.maps.places.PlaceResult) => void;
}

export default function AutocompleteGoogleMapInput(props: Props) {
  const { map, onChangePlace } = props;
  const [search, setSearch] = useState<google.maps.places.Autocomplete>();

  const onLoadAutoComplete = useCallback(function callback(
    autocomplete: google.maps.places.Autocomplete
  ) {
    setSearch(autocomplete);
  },
  []);

  function onPlaceChanged() {
    if (search != null) {
      const place = search.getPlace();
      console.log(place.geometry?.location?.lat());
      console.log(place.geometry?.location?.lng());

      // set map center
      if (place.geometry?.viewport) {
        map?.fitBounds(place.geometry.viewport);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        map?.setCenter(place.geometry?.location);
        map?.setZoom(17);
      }
      if (onChangePlace) {
        onChangePlace(place);
      }
    } else {
      console.log("please input place or address");
    }
  }
  return (
    <Autocomplete
      onPlaceChanged={onPlaceChanged}
      onLoad={onLoadAutoComplete}
      restrictions={{
        country: "id",
      }}
    >
      <div
        className="position-absolute"
        style={{
          top: "15%",
          right: "0px",
          zIndex: 10,
        }}
      >
        <input
          type="text"
          placeholder="Search place, address..."
          className="input-maps-autocomplete"
        />
        <RiGoogleFill
          className="position-absolute fs-14"
          style={{
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            zIndex: 10,
            color: "var(--bs-secondary)",
          }}
        />
      </div>
    </Autocomplete>
  );
}
