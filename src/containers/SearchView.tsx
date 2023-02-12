import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import AutoComplete from "../components/AutoComplete";
import SearchButton from "../components/SearchButton";
import SearchList from "../components/SearchList";
import { Position, SearchCityModel, SearchResult } from "../entity";
import {
  fetchSearchResults,
  setFilters,
  setHasAutoComplete,
} from "../redux/reducers/SearchSlice";
import { getCoordinates } from "../redux/reducers/WeatherThemeSlice";
import {
  coordsSelector,
  currentWeatherSelector,
  filtersSelector,
  hasAutoCompleteSelector,
  searchResultsSelector,
} from "../redux/selectors";
import { AppDispatch } from "../redux/store";
import {
  getLocalStorageItems,
  uniqueItemsArray,
  setLocalStorageItems,
} from "../shared/helpers";

const SearchView = () => {
  const filters = useSelector(filtersSelector);
  const searchResults = useSelector(searchResultsSelector);
  const hasAutoComplete = useSelector(hasAutoCompleteSelector);
  const currentWeather = useSelector(currentWeatherSelector);
  const currCoords = useSelector(coordsSelector);
  const searchCities = getLocalStorageItems(
    "searchCities"
  ) as Array<SearchResult>;

  const dispatch = useDispatch<AppDispatch>();
  const textTimeout = useRef(0);
  const handleInputSearch = (text: string = "") => {
    if (textTimeout.current) window.clearTimeout(textTimeout.current);
    textTimeout.current = window.setTimeout(() => {
      dispatch(setFilters(text));
      text.length === 0
        ? dispatch(setHasAutoComplete(false))
        : dispatch(setHasAutoComplete(true));
    }, 1000);
  };
  const handleSelectCity = (coords: Position) => {
    dispatch(getCoordinates(coords));
    const currentCity = SearchCityModel(currentWeather, currCoords);
    if (searchCities.length === 4) {
      searchCities.unshift(currentCity);
      searchCities.pop();
    } else {
      searchCities.unshift(currentCity);
    }
    setLocalStorageItems("searchCities", uniqueItemsArray(searchCities));
  };

  useEffect(() => {
    if (filters.length === 0) return;
    dispatch(fetchSearchResults(filters));
  }, [dispatch, filters]);
  return (
    <Row className="items-center">
      <Col lg="4" className="relative p-1">
        <SearchButton
          handleInputSearch={handleInputSearch}
          filtersLength={filters.length}
        />
        {hasAutoComplete && (
          <AutoComplete
            results={searchResults}
            hasAutoComplete={hasAutoComplete}
            handleSelectCity={handleSelectCity}
          />
        )}
      </Col>
      <SearchList
        searchCities={searchCities}
        handleSelectCity={handleSelectCity}
      />
    </Row>
  );
};

export default SearchView;
