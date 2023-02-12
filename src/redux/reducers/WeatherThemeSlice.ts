import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Position, WeatherThemeState } from "../../entity";

const initialState: WeatherThemeState = {
  theme: "",
  coords: {
    latitude: 0,
    longitude: 0,
  },
};
export const weatherThemeSlice = createSlice({
  name: "weatherTheme",
  initialState,
  reducers: {
    getCoordinates: (state, action: PayloadAction<Position>) => {
      state.coords = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const { getCoordinates, setTheme } = weatherThemeSlice.actions;
