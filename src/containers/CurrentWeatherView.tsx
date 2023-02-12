import { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import MainWeatherCard from "../components/MainWeatherCard";
import WeatherMapCard from "../components/WeatherMapCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentWeather } from "../redux/reducers/CurrentWeatherSlice";
import { AppDispatch } from "../redux/store";
import { coordsSelector } from "../redux/selectors";
const CurrentWeatherView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coords = useSelector(coordsSelector);
  useEffect(() => {
    dispatch(fetchCurrentWeather(coords));
  }, [dispatch, coords]);
  return (
    <Container>
      <Row>
        <Col lg="8">
          <MainWeatherCard />
        </Col>
        <Col lg="4">
          <WeatherMapCard />
        </Col>
      </Row>
    </Container>
  );
};

export default CurrentWeatherView;
