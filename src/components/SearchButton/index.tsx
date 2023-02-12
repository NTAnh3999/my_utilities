const SearchButton: React.FC<any> = function (props) {
  const hasAutoComplete = props.filtersLength > 0 ? true : false;
  const handleOnChange = function (e: any) {
    props.handleInputSearch(e.target.value);
  };
  return (
    <div
      className={` bg-slate-200 ${
        hasAutoComplete ? "rounded-t-lg" : "rounded-lg"
      }  border-b-2 border-slate-600 `}
    >
      <input
        type="text"
        className="w-[92%] bg-transparent outline-none p-2 text-black placeholder:text-slate-700"
        placeholder="Tìm kiếm vị trí"
        aria-describedby="button-addon2"
        onChange={handleOnChange}
      />
      <button className="inline-block text-xl" type="button" id="button-addon2">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};
export default SearchButton;
