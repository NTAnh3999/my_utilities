import React from "react";
import { useDispatch } from "react-redux";
import { GeoDbDataResponse } from "../../entity";
import { setHasAutoComplete } from "../../redux/reducers/SearchSlice";

const AutoComplete = (props: any) => {
  const { results: searchResults, handleSelectCity } = props;
  const dispatch = useDispatch();
  return (
    <ul className="absolute top-[41px] w-[415.5px] z-10 rounded-b-lg bg-slate-300 p-2">
      {searchResults.length === 0 ? (
        <span>Không tìm thấy kết quả</span>
      ) : (
        searchResults.map((result: GeoDbDataResponse) => (
          <li
            key={result.id as React.Key}
            className="p-[6px] hover:bg-slate-400 cursor-pointer"
            onClick={() => {
              handleSelectCity({
                latitude: result.latitude,
                longitude: result.longitude,
              });
              dispatch(setHasAutoComplete(false));
            }}
          >
            <span className="truncate block">
              {`${result.city}, ${result.region}`}
            </span>
            <span>{result.country}</span>
          </li>
        ))
      )}
    </ul>
  );
};

export default AutoComplete;
