import { useEffect } from "react";
import { Container, Row } from "reactstrap";
import SubWeatherCard from "../components/SubWeatherCard";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  fetchWeather5Days,
  setDayWeather,
} from "../redux/reducers/WeatherForecastSlice";
import {
  coordsSelector,
  daysWeatherSelector,
  activeDaySelector,
  themeSelector,
} from "../redux/selectors";
import { getThemeColor } from "../shared/helpers";
const ForecastWeatherView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coords = useSelector(coordsSelector);
  const weatherForecastSelector = useSelector(daysWeatherSelector);
  const activeDayNum = useSelector(activeDaySelector);
  const theme = useSelector(themeSelector);
  useEffect(() => {
    dispatch(fetchWeather5Days(coords));
  }, [dispatch, coords]);
  useEffect(() => {
    dispatch(setDayWeather(weatherForecastSelector[activeDayNum]));
  }, [dispatch, activeDayNum, weatherForecastSelector]);
  return (
    <Container>
      <h4 className={`${getThemeColor(theme)?.text} my-2`}>
        Dự báo 5 ngày tới
      </h4>
      <Row>
        {weatherForecastSelector.map((dayForecast, idx) => (
          <SubWeatherCard key={idx} id={idx} dayForecast={dayForecast} />
        ))}
      </Row>
    </Container>
  );
};

export default ForecastWeatherView;
