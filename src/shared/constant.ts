export const IMAGE_URL: string = `https://openweathermap.org/img/wn/`;
export const OPEN_WEATHER_API_PARAMS = function (
  lat: number,
  lon: number,
  units: string = "metric",
  lang: string = "vi"
) {
  return {
    lat,
    lon,
    appid: process.env.REACT_APP_API_KEY,
    units,
    lang,
  };
};
