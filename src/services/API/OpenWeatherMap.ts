import axios from "axios";
import { Position, WeatherDataResponse } from "../../entity";
import { OPEN_WEATHER_API_PARAMS } from "../../shared/constant";
const weatherDataClient = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/`,
  headers: {
    "content-type": "application/json",
  },
});

const getCurrentWeather = async (
  coords: Position
): Promise<WeatherDataResponse> => {
  const response = await weatherDataClient.get(`weather`, {
    params: OPEN_WEATHER_API_PARAMS(coords.latitude, coords.longitude),
  });
  return response.data;
};
const getWeatherForecast = async (
  coords: Position
): Promise<Array<WeatherDataResponse>> => {
  const response = await weatherDataClient.get("forecast", {
    params: OPEN_WEATHER_API_PARAMS(coords.latitude, coords.longitude),
  });
  return response.data.list;
};
export { getCurrentWeather, getWeatherForecast };
