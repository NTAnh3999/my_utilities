import axios from "axios";
import { GeoDbDataResponse } from "../../entity";

const GeoDbClient = axios.create({
  baseURL: "https://wft-geo-db.p.rapidapi.com/v1/geo/",
  headers: {
    "X-RapidAPI-Key": "539732124amsh8c101f1649813acp144687jsn987f41a6268e",
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
});

export const getCityData = async (
  city: string
): Promise<Array<GeoDbDataResponse>> => {
  const res = await GeoDbClient.get("cities", {
    params: { minPopulation: "70000", namePrefix: city },
  });
  return res.data.data;
};
