import React, { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import CurrentWeatherView from "../containers/CurrentWeatherView";
import ForecastWeatherView from "../containers/ForecastWeatherView";
import { useDispatch, useSelector } from "react-redux";
import { Position } from "../entity";
import { getCoordinates } from "../redux/reducers/WeatherThemeSlice";
import SearchView from "../containers/SearchView";
import { themeSelector } from "../redux/selectors";
import { getThemeColor } from "../shared/helpers";
const Home = () => {
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        dispatch(getCoordinates(coords));
      },
      () => {
        console.log("Unable to retrieve your location");
      }
    );
  }, [dispatch]);
  return (
    <Container
      fluid
      className={`bg-gradient-to-b ${
        getThemeColor(theme)?.container
      } min-h-screen m-0`}
    >
      <Row className={`${getThemeColor(theme)?.searchBar} mb-4`}>
        <Col lg="10" className="mx-auto px-0">
          <SearchView />
        </Col>
      </Row>
      <Container>
        <Row>
          <Col lg="9">
            <CurrentWeatherView />
            <ForecastWeatherView />
          </Col>
          <Col lg="3">Todo-list View</Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
