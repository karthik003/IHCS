import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
// import data from "../../layout/GlobalSearch/data";
import TableSearch from "./TableSearch";
import { getTableSearch, setTableLoading } from "../../redux/actions/table";
import LoaderSecondary from "../../layout/Loader/LoaderSecondary";

export default function Search() {
  const dispatch = useDispatch();

  const AC = bindActionCreators({ getTableSearch, setTableLoading }, dispatch);
  const { tableSearch, tableLoading } = useSelector((state) => state.table);
  const [search, setsearch] = useState("");

  function onSearch() {
    search && AC.getTableSearch(search);
  }

  useEffect(() => {
    AC.setTableLoading(false);
    return () => {
      AC.setTableLoading(true);
    };
  }, []);
  return (
    <div className="search-global">
      <div className="search-input-global hd-mb">
        <input
          type="text"
          placeholder="search"
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />

        <i className="fas fa-search" onClick={onSearch}></i>
        {/* {search && (
          <div className="list">
            {data.map((item, index) => (
              <div key={index} className="item">
                <i className="fas fa-check"></i>
                <div className="text">
                  <h3>{item.name}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>

      {tableSearch && !tableLoading && <TableSearch data={tableSearch.Table} tableTitle={tableSearch.tableTitle} />}
      {!tableSearch && !tableLoading && (
        <div className="feedback">
          <p>Please search in order to view table.</p>
        </div>
      )}
      {tableLoading && (
        <div className="feedback">
          <LoaderSecondary />
          Loading...
        </div>
      )}
    </div>
  );
}
