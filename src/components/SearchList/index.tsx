import React from "react";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { SearchResult } from "../../entity";
import { themeSelector } from "../../redux/selectors";
import { IMAGE_URL } from "../../shared/constant";
import { getThemeColor, tempRound } from "../../shared/helpers";

const SearchList = (props: any) => {
  const searchCities: Array<SearchResult> = props.searchCities;
  const theme = useSelector(themeSelector);
  return (
    <>
      {searchCities.length !== 0 &&
        searchCities.map((searchCity, key) => (
          <Col
            key={key}
            lg="2"
            className={`border-r-[1px] border-r-zinc-700 block h-12 p-1 cursor-pointer ${
              getThemeColor(theme)?.text
            } ${getThemeColor(theme)?.BgHover}`}
            onClick={() => props.handleSelectCity(searchCity.coords)}
          >
            <div className="h-full flex items-center justify-around">
              <span className="truncate text-lg font-bold">
                {searchCity.city}
              </span>
              <span className="flex items-center">
                <span>{tempRound(searchCity.temperature)}&#176;</span>
                <img src={`${IMAGE_URL}${searchCity.icon}.png`} alt="Icon" />
              </span>
            </div>
          </Col>
        ))}
    </>
  );
};

export default SearchList;
