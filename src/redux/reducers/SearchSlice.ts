import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GeoDbDataResponse, SearchState } from "../../entity";
import { getCityData } from "../../services/API";
export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (filters: string) => {
    const response = await getCityData(filters);
    return response;
  }
);
const searchSlice = createSlice({
  name: "search",
  initialState: {
    filters: "",
    hasAutoComplete: false,
    results: [],
  } as SearchState,
  reducers: {
    setFilters: (state: SearchState, actions) => {
      state.filters = actions.payload;
    },
    setHasAutoComplete: (
      state: SearchState,
      actions: PayloadAction<boolean>
    ) => {
      state.hasAutoComplete = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchSearchResults.fulfilled,
      (
        state: SearchState,
        actions: PayloadAction<Array<GeoDbDataResponse>>
      ) => {
        state.results = actions.payload;
      }
    );
  },
});
export const { setFilters, setHasAutoComplete } = searchSlice.actions;
export default searchSlice;
