import React from "react";
import { CardImg, CardTitle, Col } from "reactstrap";
import { WeatherDataResponse } from "../../entity";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_URL } from "../../shared/constant";
import "moment/locale/vi";
import {
  convertUnixtimeToFormatDt,
  getMaxTemp,
  getMinTemp,
  getThemeColor,
} from "../../shared/helpers";
import { activeDaySelector, themeSelector } from "../../redux/selectors";
import { setActiveCard } from "../../redux/reducers/WeatherForecastSlice";
interface SubWeatherCardProps {
  id: number;
  dayForecast: Array<WeatherDataResponse>;
}
const SubWeatherCard: React.FC<SubWeatherCardProps> = ({
  id,
  dayForecast,
}): React.ReactElement => {
  const cardActive = useSelector(activeDaySelector);
  const theme = useSelector(themeSelector);
  const dispatch = useDispatch();
  const isActive = cardActive === id ? true : false;
  return (
    <Col
      key={id}
      lg={isActive ? "4" : "2"}
      className={`transition-all duration-100 ease-out`}
    >
      <div
        className={`my-2 rounded-md p-3 hover:cursor-pointer ${
          isActive
            ? getThemeColor(theme)?.subCardBgActive
            : getThemeColor(theme)?.subCardBg
        } ${getThemeColor(theme)?.BgHover}`}
        onClick={() => {
          dispatch(setActiveCard(id));
        }}
      >
        <div className={`pl-4 relative ${getThemeColor(theme)?.text}`}>
          <CardTitle className={`text-lg mb-1 `}>
            {convertUnixtimeToFormatDt(dayForecast[0].dt, "ddd Do/MM")}
          </CardTitle>
          <div className="flex">
            <CardImg
              src={`${IMAGE_URL.concat(
                `${dayForecast[0].weather[0].icon}.png`
              )}`}
              alt="Icon"
              style={{ width: "4.5rem" }}
            />
            <div className="flex flex-col">
              <p>{getMaxTemp(dayForecast)}&#176;</p>
              <p>{getMinTemp(dayForecast)}&#176;</p>
            </div>
          </div>
          {isActive && (
            <div className={`flex flex-col absolute right-4 top-1/4`}>
              <p>Độ ẩm: {dayForecast[0].main.humidity}%</p>
              <p>Gió: {dayForecast[0].wind.speed}m/s</p>
            </div>
          )}
          {isActive && (
            <div className="">
              <p>
                Mô tả:{" "}
                {`${
                  dayForecast[0].weather[0].main
                } (${dayForecast[0].weather[0].description.toUpperCase()})`}
              </p>
            </div>
          )}
        </div>
      </div>
    </Col>
  );
};

export default SubWeatherCard;
