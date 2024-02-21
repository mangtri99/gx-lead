export const SIDEBAR_WIDTH = 256;
export const SIDEBAR_COLLAPSED_WIDTH = 64;
export const VERSION_APP = import.meta.env.VITE_REACT_APP_VERSION as string;
export const GOOGLE_MAP_API_KEY = import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY as string;
export const INITIAL_CENTER_MAP = {
  lat: -8.663925503014124,
  lng: 115.16680302948615,
} as google.maps.LatLngLiteral;