import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ButtonBase } from "@mui/material";
import useSort from "../useSort";
import TablePagination from "@mui/material/TablePagination";
import { TablePaginationActions } from "../TablePaginationActions";
import { Link } from "react-router-dom";

const TablePrimary = (props) => {
  const { data } = props;

  const initialRenderSearchRef = useRef(true);

  // eslint-disable-next-line no-unused-vars
  const [table, settable] = useState(data.rows);
  const [displayTable, setdisplayTable] = useState(table);
  const { items, sortConfig, requestSort } = useSort(table);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [search, setsearch] = useState("");

  useEffect(() => {
    settable(data.rows);
  }, [data]);

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

  function searchTable(e) {
    setsearch(e.target.value);
    requestSort(null);
    setRowsPerPage(data.rows.length);
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
    requestSort(null);
    const startIndex = (page + 1) * rowsPerPage - rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = data.rows.slice(startIndex, endIndex);
    settable(paginatedData);
  }, [page, rowsPerPage]);

  useEffect(() => {
    if (initialRenderSearchRef.current) {
      initialRenderSearchRef.current = false;
    } else {
      if (search === "") {
        settable(data.rows);
      } else {
        const searchData = data.rows.filter((item) => searchResult(item.row));
        settable(searchData);
      }
    }
  }, [search]);

  useEffect(() => {
    setdisplayTable(table);
  }, [table]);

  function renderTableRow() {
    if (displayTable.length === 0) {
      return (
        <tr className="no-data">
          <td>No results found.</td>
        </tr>
      );
    }
    return displayTable.map((item) => (
      <tr key={item.id}>
        {item.row.map((r, index) => {
          return (
            <td
              className={`${search !== "" && r.value.toString().includes(search) ? "text-highlight" : ""} ${
                r.color === "green" ? "green" : r.color === "red" ? "red" : ""
              } ${r.isBold ? "bold" : ""}`}
              key={index}
              style={{ color: r.color }}
            >
              {r.clickable ? <Link to={r.path}>{r.value}</Link> : r.icon ? <i className={r.icon}></i> : r.value}
            </td>
          );
        })}
      </tr>
    ));
  }

  return (
    <div className="table-primary">
      <div className="header">
        <div className="search">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="search" value={search} onChange={searchTable} />
        </div>

        <TablePagination
          className="pagination"
          component="div"
          rowsPerPageOptions={[10, 25, 50, { label: "All", value: data.rows.length }]}
          count={data.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </div>
      <h1>{data.tabletitle}</h1>
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
            </tr>
          </thead>
          <tbody>{renderTableRow()}</tbody>
        </table>
      </div>
    </div>
  );
};

TablePrimary.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TablePrimary;
