import {
  Card,
  CardBody,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

import { IMAGE_URL } from "../../shared/constant";
import moment from "moment";
import AdditionalInfo from "../AdditionalInfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThemeColor, tempRound } from "../../shared/helpers";
import { setTheme } from "../../redux/reducers/WeatherThemeSlice";
import { currentWeatherSelector, themeSelector } from "../../redux/selectors";
const MainWeatherCard = () => {
  const [weatherBg, setWeatherBg] = useState("");
  const dispatch = useDispatch();
  const theme = useSelector(themeSelector);
  const weatherData = useSelector(currentWeatherSelector);

  const datetime: string = moment.unix(weatherData.datetime).format("HH:mm");
  useEffect(() => {
    dispatch(setTheme(weatherData.mainDescription));
    const mainCardBg = async () =>
      await import(`../../assets/images/${theme}.gif`);
    mainCardBg().then((bg) => setWeatherBg(bg.default));
  }, [dispatch, weatherData.mainDescription, theme]);

  return (
    <div>
      <h5 className={`${getThemeColor(theme)?.text}`}>
        {weatherData.location.city + ", " + weatherData.location.country}
      </h5>
      <Card inverse style={{ borderWidth: 0 }}>
        <CardImg
          alt="Card weather"
          src={weatherBg}
          style={{
            height: 270,
          }}
          width="100%"
        />
        <CardImgOverlay className={getThemeColor(theme)?.text}>
          <CardTitle tag="h6">THỜI TIẾT HIỆN TẠI</CardTitle>
          <CardText>
            <small>{datetime}</small>
          </CardText>
          <CardBody>
            <Row>
              <Col lg="2">
                <img
                  src={`${IMAGE_URL.concat(`${weatherData.icon}@2x.png`)}`}
                  alt="Icon"
                />
              </Col>
              <Col lg="2">
                <span className="text-[2.8rem]">
                  {tempRound(weatherData.temperature)}
                </span>
                <span className="text-2xl">&#176;C</span>
              </Col>
              <Col lg="6">
                <CardText>{weatherData.mainDescription}</CardText>
                <CardText>
                  CẢM THẤY NHƯ {tempRound(weatherData.feelLike)} &#176;C
                </CardText>
              </Col>
            </Row>
            <Row>
              <CardText>
                {weatherData.detailDescription?.toUpperCase()}
              </CardText>
            </Row>
            <Row>
              <AdditionalInfo
                title="gió"
                info={`${weatherData.windSpeed} m/s`}
              />
              <AdditionalInfo title="độ ẩm" info={`${weatherData.humidity}%`} />
              <AdditionalInfo
                title="tầm nhìn"
                info={`${weatherData.visibility} m`}
              />
              <AdditionalInfo
                title="áp suất"
                info={`${weatherData.pressure} hPa`}
              />
            </Row>
          </CardBody>
        </CardImgOverlay>
      </Card>
    </div>
  );
};

export default MainWeatherCard;
