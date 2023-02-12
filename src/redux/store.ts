import { configureStore } from "@reduxjs/toolkit";
import { currentWeatherSlice } from "./reducers/CurrentWeatherSlice";
import searchSlice from "./reducers/SearchSlice";
import { weatherForecastSlice } from "./reducers/WeatherForecastSlice";
import { weatherThemeSlice } from "./reducers/WeatherThemeSlice";

export const store = configureStore({
  reducer: {
    currentWeather: currentWeatherSlice.reducer,
    weatherForecast: weatherForecastSlice.reducer,
    weatherTheme: weatherThemeSlice.reducer,
    search: searchSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
