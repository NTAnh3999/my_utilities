import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Position, WeatherForecastState } from "../../entity";
import { getWeatherForecast } from "../../services/API";
import { groupArray } from "../../shared/helpers";

const initialState: WeatherForecastState = {
  activeCard: 0,
  weather5Days: [],
  dayWeather: [],
};
export const fetchWeather5Days = createAsyncThunk(
  "weatherForecast/fetchWeather5Days",
  async (coords: Position) => {
    const response = await getWeatherForecast(coords);
    const arrayForecast5Days = groupArray(response);
    return arrayForecast5Days;
  }
);
export const weatherForecastSlice = createSlice({
  name: "weatherForecast",
  initialState,
  reducers: {
    setActiveCard: (state: WeatherForecastState, action) => {
      state.activeCard = action.payload;
    },
    setDayWeather: (state: WeatherForecastState, action) => {
      state.dayWeather = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather5Days.fulfilled, (state, action) => {
      state.weather5Days = action.payload;
    });
  },
});
export const { setActiveCard, setDayWeather } = weatherForecastSlice.actions;
