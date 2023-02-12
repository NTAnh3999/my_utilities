import { WeatherDataResponse, SearchResult } from "../../entity";
import moment from "moment";
export function groupArray(arr: Array<WeatherDataResponse>) {
  const chunkSize: number = 8;
  let weatherByDays: Array<Array<WeatherDataResponse>> = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    let chunk: Array<WeatherDataResponse> = arr.slice(i, i + chunkSize);
    weatherByDays.push(chunk);
  }
  return weatherByDays;
}
export function convertUnixtimeToFormatDt(
  dt: number,
  formatDt: string
): string {
  return moment.unix(dt).format(formatDt);
}
export function tempRound(temp: number): number {
  return Math.round(temp);
}
export function tempAvg(temp: Array<number>): number {
  const tempAvg =
    temp.reduce((prevTemp, currTemp) => prevTemp + currTemp, 0) / temp.length;
  return tempAvg;
}

type temperatureType = "temp" | "temp_max" | "temp_min";
export function getTempArr(
  dayWeather: Array<WeatherDataResponse>,
  type: temperatureType
): Array<number> {
  return dayWeather?.reduce((acc, currArr) => {
    const temp = tempRound(currArr.main[type]);
    return [...acc, temp];
  }, [] as Array<number>);
}
export function getMaxTemp(dayWeather: Array<WeatherDataResponse>): number {
  const arrMaxTemp = getTempArr(dayWeather, "temp_max");
  return Math.max(...arrMaxTemp);
}
export function getMinTemp(dayWeather: Array<WeatherDataResponse>): number {
  const arrMinTemp = getTempArr(dayWeather, "temp_min");
  return Math.min(...arrMinTemp);
}
export const getLocalStorageItems = (key: string): Array<SearchResult> => {
  const data = localStorage.getItem(key) || "[]";
  return JSON.parse(data);
};
export const setLocalStorageItems = (
  key: string,
  data: Array<SearchResult>
) => {
  const encodeData = JSON.stringify(data);
  localStorage.setItem(key, encodeData);
};
export const uniqueItemsArray = (
  arr: Array<SearchResult>
): Array<SearchResult> => {
  const uniqueArray = arr.reduce(function (searchArr, currItem) {
    const isDuplicate = searchArr.some((item) => item.id === currItem.id);
    return isDuplicate ? [...searchArr] : [...searchArr, currItem];
  }, [] as Array<SearchResult>);
  return uniqueArray;
};
export function getThemeColor(theme: string) {
  switch (theme) {
    case "clouds":
      return {
        container: "from-slate-500 to-slate-800",
        searchBar: "bg-slate-600",
        text: "text-cyan-100",
        subCardBg: "bg-slate-600",
        subCardBgActive: "bg-slate-500",
        BgHover: "hover:bg-slate-500",
      };

    case "clear":
      return {
        container: "from-sky-200 to-sky-600",
        searchBar: "bg-sky-400",
        text: "text-zinc-800",
        subCardBg: "bg-sky-500",
        subCardBgActive: "bg-sky-400",
        BgHover: "hover:bg-sky-300",
      };
    case "snow":
      return {
        container: "from-blue-400 to-blue-700",
        searchBar: "bg-blue-600",
        text: "text-gray-400",
        subCardBg: "bg-blue-600",
        subCardBgActive: "bg-blue-500",
        BgHover: "hover:bg-blue-500",
      };
    default:
      break;
  }
}
