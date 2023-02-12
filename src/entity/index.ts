export interface WeatherDataResponse {
  name: string;
  coords: {
    lon: number;
    lat: number;
  };
  sys: {
    id: number;
    country: string;
  };
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: [{ main: string; description: string; icon: string }];
  clouds?: { all: number };
  rain?: { "1h": number; "3h": number };
  snow?: { "1h": number; "3h": number };
  wind: {
    speed: number;
  };
  visibility: number;
}
export interface MainWeathereCardInfo {
  location: Location;
  temperature: number;
  feelLike: number;
  windSpeed: number;
  humidity: number;
  visibility: number;
  pressure: number;
  mainDescription: string;
  detailDescription: string;
  specificIndex: Object | undefined;
  datetime: number;
  icon: string;
}
export const CurrentWeatherModel = (data: WeatherDataResponse) => ({
  location: {
    id: data.sys.id,
    city: data.name,
    country: data.sys.country,
  },
  temperature: data.main.temp,
  feelLike: data.main.feels_like,
  windSpeed: data.wind.speed,
  humidity: data.main.humidity,
  visibility: data.visibility,
  pressure: data.main.pressure,
  mainDescription: data.weather[0].main.toLowerCase(),
  detailDescription: data.weather[0].description,
  specificIndex: data.clouds || data.rain || data.snow,
  datetime: data.dt,
  icon: data.weather[0].icon,
});
export interface CurrentWeatherState {
  data: MainWeathereCardInfo;
}
export interface WeatherThemeState {
  theme: string;
  coords: { latitude: number; longitude: number };
}
export interface SearchState {
  filters: string;
  hasAutoComplete: boolean;
  results: Array<GeoDbDataResponse>;
}
export interface Position {
  latitude: number;
  longitude: number;
}
export interface Location {
  id: number;
  city: string;
  country: string;
}
export interface SearchResult {
  id: number;
  city: string;
  coords: Position;
  temperature: number;
  icon: string;
}
export const SearchCityModel = function (
  data: MainWeathereCardInfo,
  coords: Position
) {
  const { latitude, longitude } = coords;
  return {
    id: data.location.id,
    city: data.location.city,
    coords: { latitude, longitude },
    temperature: data.temperature,
    icon: data.icon,
  };
};
export interface WeatherForecastState {
  activeCard: number;
  weather5Days: Array<Array<WeatherDataResponse>>;
  dayWeather: Array<WeatherDataResponse>;
}
export interface WeatherForecastCardInfo {
  isActive: boolean;
  datetime: number;
  icon: string;
  temperatureRange: Array<number>;
  moreDescriptions?: {
    mainDescription: string;
    humidity: number;
  };
}
export interface AdditionalInfoCardProps {
  title: string;
  info: string | number;
}
export interface GeoDbDataResponse {
  id: Number;
  wikiDataId: String;
  type: String;
  city: String;
  name: String;
  country: String;
  countryCode: String;
  region: String;
  regionCode: String;
  latitude: Number;
  longitude: Number;
  population: Number;
}
