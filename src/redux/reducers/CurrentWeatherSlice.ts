import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Position,
  CurrentWeatherState,
  CurrentWeatherModel,
} from "../../entity";
import { getCurrentWeather } from "../../services/API";
const initialState: CurrentWeatherState = {
  data: {
    location: {
      id: 0,
      city: "",
      country: "",
      // lat: 0,
      // lon: 0,
    },
    temperature: 0,
    feelLike: 0,
    windSpeed: 0,
    humidity: 0,
    visibility: 0,
    pressure: 0,
    mainDescription: "",
    detailDescription: "",
    specificIndex: {},
    datetime: 0,
    icon: "",
  },
};
export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather",
  async (coords: Position) => {
    const response = await getCurrentWeather(coords);
    const currentWeather = CurrentWeatherModel(response);
    return currentWeather;
  }
);
export const currentWeatherSlice = createSlice({
  name: "currentWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentWeather.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
