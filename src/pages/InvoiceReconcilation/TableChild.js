/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ButtonBase, Tooltip } from "@mui/material";
import useSort from "./useSort";
import TablePagination from "@mui/material/TablePagination";
import { TablePaginationActions } from "../../components/table/TablePaginationActions";
import ViewPopup from "./ViewPopup";

const NestedTable = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { data, tableTitle, parentSearch } = props;

  const [table, settable] = useState(data.rows);
  const [displayTable, setdisplayTable] = useState(table);
  const { items, sortConfig, requestSort } = useSort(table);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setsearch] = useState("");
  const [viewPopup, setviewPopup] = useState(null);

  useEffect(() => {
    settable(data.rows);
    requestSort(null);
    setRowsPerPage(data.rows.length ? data.rows.length : -1);
    setPage(0);
  }, [data.rows]);

  useEffect(() => {
    setdisplayTable(items);
  }, [items]);

  const handleChangePage = (event, newPage) => {
    setsearch("");
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setsearch("");
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    requestSort(null);
    const startIndex = (page + 1) * rowsPerPage - rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = data.rows.slice(startIndex, endIndex);
    settable(paginatedData);
  }, [page, rowsPerPage]);

  useEffect(() => {
    setdisplayTable(table);
  }, [table]);

  function searchTable(e) {
    setsearch(e.target.value);
    requestSort(null);
    setRowsPerPage(data.rows.length ? data.rows.length : -1);
    setPage(0);
  }

  function searchResult(row) {
    const res = row.find((item) => {
      if (!item.searching) {
        return item.value.toString().includes(search);
      } else {
        return null;
      }
    });
    if (res) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (search === "") {
      settable(data.rows);
    } else {
      const searchData = data.rows.filter((item) => searchResult(item.row));
      settable(searchData);
    }
  }, [search]);

  function renderTableRow() {
    if (displayTable.length === 0) {
      return (
        <tr className="no-data">
          <td>No results found.</td>
        </tr>
      );
    }
    return displayTable.map((item) => (
      <div key={item.id}>
        <tr>
          {item.row.map((r, index) => {
            return (
              <td
                key={index}
                className={`${
                  parentSearch !== "" && r.value.toString().includes(parentSearch) ? "search-highlight" : ""
                } ${r.color === "green" ? "green" : r.color === "red" ? "red" : ""} ${r.isBold ? "bold" : ""}`}
                style={{ color: r.color }}
              >
                {r.icon && <i className={r.icon}></i>}
                <Tooltip title={r.value}>
                  <span>{r.value}</span>
                </Tooltip>
              </td>
            );
          })}
          <td className="actions">
            <div className="icon" onClick={() => setviewPopup(item.nestedTable)}>
              <i className="fas fa-eye"></i>
            </div>
          </td>
        </tr>
      </div>
    ));
  }

  return (
    <div className="table-child">
      {/* <div className="header">
        <div className="search">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="search" value={search} onChange={searchTable} />
        </div>
        <div className="right">
          <div className="filter">
            <p>Filter</p>
            <div className="icon" onClick={() => setshowFilter(true)}>
              <i className="fas fa-filter"></i>
            </div>
            <div className={`filter-container ${showFilter ? "filter-active" : ""}`}>
              <div className="container">
                <div className="clr">
                  <div className="icon" onClick={() => setfilter(convertArrayToObjectFilter(headers, "dataRef"))}>
                    <p>CLR</p>
                  </div>
                  <p>Clear filter</p>
                </div>
                <div className="cancel">
                  <div className="icon" onClick={() => setshowFilter(false)}>
                    <i className="fas fa-times"></i>
                  </div>
                </div>
                {headers.map(
                  (item) =>
                    item.filter && (
                      <div key={item.id} className="filter-input">
                        <p>{item.name}</p>
                        <select
                          id={item.dataRef}
                          name={item.dataRef}
                          value={filter[item.dataRef]}
                          onChange={(e) => setfilter({ ...filter, [e.target.name]: e.target.value })}
                        >
                          <option value="">None</option>
                          {item.options.map((option) => (
                            <option key={option.id} value={option.value}>
                              {option.text}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                )}
              </div>
              <div className="bg-dark" onClick={() => setshowFilter(false)} />
            </div>
          </div>

          <TablePagination
            className="pagination"
            component="div"
            rowsPerPageOptions={[10, 25, 50, { label: "All", value: rows.length ? rows.length : -1 }]}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </div>
      </div> */}
      {/* <h1>{tableTitle}</h1> */}
      <div className="scroll-x">
        <table>
          <thead>
            <tr>
              {data.headers.map((item, index) => (
                <th key={item.dataRef}>
                  <p>{item.name}</p>
                  {item.sorting &&
                    (sortConfig && sortConfig.dataRef === item.dataRef ? (
                      <ButtonBase className="sort active-sort" onClick={() => requestSort(item.dataRef, index)}>
                        <i
                          className={sortConfig.sortType === "ascending" ? "fas fa-chevron-down" : "fas fa-chevron-up"}
                        ></i>
                      </ButtonBase>
                    ) : (
                      <ButtonBase
                        className="sort"
                        onClick={() => {
                          requestSort(item.dataRef, index);
                        }}
                      >
                        <i className="fas fa-chevron-down"></i>
                      </ButtonBase>
                    ))}
                </th>
              ))}
              <th>View</th>
            </tr>
          </thead>
          <tbody>{renderTableRow()}</tbody>
        </table>
      </div>
      {viewPopup && <ViewPopup data={viewPopup} setisViewPopup={setviewPopup} />}
    </div>
  );
};

NestedTable.propTypes = {
  data: PropTypes.object,
  tableTitle: PropTypes.string,
  parentRowId: PropTypes.any,
  parentSearch: PropTypes.string,
};

export default NestedTable;
