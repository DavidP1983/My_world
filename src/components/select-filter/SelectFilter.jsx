import SelectItem from "../select-item/SelectItem";
import SelectLimit from "../select-limit/SelectLimit";
import MyInputSearch from "../UI/input/MyInputSearch";
import useDebounce from "../../hooks/useDebounce";

import './selectFilter.scss';

const SelectFilter = ({filter, setFilter, setTotalPage, limit}) => {
  const {handleChangeSearchInput} = useDebounce();

  return (
    <div>
      <div className="select">
        <SelectItem onChange={(val) => setFilter({...filter, sort: val})} />
        {limit > 10 ? <SelectLimit onChange={(val) => setTotalPage(val)}/> : null}
      </div>
      <MyInputSearch
        style={{ marginBottom: 40 }}
        placeholder="search"
        name = 'search'
        // value={filter.search}
        onChange={(e) => handleChangeSearchInput(e, setFilter, filter)}
      />
    </div>
  );
};

export default SelectFilter;
