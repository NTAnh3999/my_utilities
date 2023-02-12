import {
  MainWeathereCardInfo,
  Position,
  WeatherDataResponse,
} from "../../entity";
import { RootState } from "../store";

export const daysWeatherSelector = (
  state: RootState
): Array<Array<WeatherDataResponse>> => state.weatherForecast.weather5Days;
export const currentWeatherSelector = (
  state: RootState
): MainWeathereCardInfo => state.currentWeather.data;
export const themeSelector = (state: RootState) => state.weatherTheme.theme;
export const activeDaySelector = (state: RootState): number =>
  state.weatherForecast.activeCard;
export const coordsSelector = (state: RootState): Position =>
  state.weatherTheme.coords;
export const filtersSelector = (state: RootState) => state.search.filters;
export const searchResultsSelector = (state: RootState) => state.search.results;
export const hasAutoCompleteSelector = (state: RootState) =>
  state.search.hasAutoComplete;
