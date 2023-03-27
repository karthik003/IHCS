import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ButtonBase } from "@mui/material";
import useSort from "../../components/table/useSort";
import TablePagination from "@mui/material/TablePagination";
import { TablePaginationActions } from "../../components/table/TablePaginationActions";
import ButtonIcon from "../../components/buttons/ButtonIcon";

const ViewGrTable = (props) => {
  const { data, tableTitle, onClosePopup } = props;

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
      <tr key={item.id}>
        {item.row.map((r, index) => {
          return (
            <td className={search !== "" && r.value.toString().includes(search) ? "text-highlight" : ""} key={index}>
              {r.value}
            </td>
          );
        })}
      </tr>
    ));
  }

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

  return (
    <div className="view-po-table">
      <ButtonIcon icon="fas fa-times" customClass="close" onClick={onClosePopup} />
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

      <h1>{tableTitle}</h1>

      <div className="scroll-x-y">
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

ViewGrTable.propTypes = {
  data: PropTypes.object.isRequired,
  tableTitle: PropTypes.string,
  onClosePopup: PropTypes.func,
};

export default ViewGrTable;
