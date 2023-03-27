/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { ButtonBase, Tooltip } from "@mui/material";
import useSort from "./useSort";
import TablePagination from "@mui/material/TablePagination";
import { TablePaginationActions } from "../../components/table/TablePaginationActions";
import NestedTable from "./TableChild";
import ViewPopup from "./ViewPopup";
import EditTableInvoice from "./EditTableInvoice";
import ViewInlinePoTable from "./ViewInlinePoTable";
import ViewInlineGrTable from "./ViewInlineGrTable";
import AddTableInvoice from "./AddTableInvoice";
import PopupConfirmation from "../../components/popup/PopupConfirmation";
import { deleteLineItem } from "../../redux/actions/ap";
import { useDispatch } from "react-redux";

const Table = (props) => {
  const dispatch = useDispatch();
  const { data, tableTitle, pdf, invoiceId, viewpo, viewgr } = props;

  const initialRenderSearchRef = useRef(true);

  const [table, settable] = useState(data.rows);
  const [displayTable, setdisplayTable] = useState(table);
  const { items, sortConfig, requestSort } = useSort(table);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [search, setsearch] = useState("");
  const [viewPopup, setviewPopup] = useState(null);
  const [isEditable, setisEditable] = useState(null);
  const [addPopup, setaddPopup] = useState(false);

  // Edit
  const [nestedTable, setnestedTable] = useState(null);
  const [poTable, setpoTable] = useState(null);
  const [grTable, setgrTable] = useState(null);
  const [popupDelete, setpopupDelete] = useState(null);

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

  function searchResult(rowData) {
    const res = rowData.row.find((item) => {
      return item.value.toString().toLowerCase().includes(search.toLowerCase());
    });
    if (rowData.nestedTable2) {
      const nestedRes = rowData.nestedTable2.rows
        .map((item) => ({
          ...item,
          row: item.row.filter((nestedItem) =>
            nestedItem.value.toString().toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((item) => item.row.length > 0);

      if (res || nestedRes.length !== 0) {
        return true;
      } else {
        return false;
      }
    } else {
      if (res) {
        return true;
      } else {
        return false;
      }
    }
  }

  useEffect(() => {
    if (initialRenderSearchRef.current) {
      initialRenderSearchRef.current = false;
    } else {
      if (search === "") {
        settable(data.rows);
      } else {
        const searchData = data.rows.filter((item) => searchResult(item));

        settable(searchData);
      }
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
          {item.nestedTable2 && (
            <td className="actions open">
              {nestedTable && nestedTable.id === item.id ? (
                <div className="icon" onClick={() => setnestedTable(null)}>
                  <i className="fas fa-chevron-up"></i>
                </div>
              ) : (
                <div className="icon" onClick={() => setnestedTable(item)}>
                  <i className="fas fa-chevron-down"></i>
                </div>
              )}
            </td>
          )}
          {item.row.map((r, index) => {
            return (
              <td
                key={index}
                className={`${
                  search !== "" && r.value.toString().toLowerCase().includes(search.toLowerCase())
                    ? "search-highlight"
                    : ""
                } ${r.color === "green" ? "green" : r.color === "red" ? "red" : ""} ${r.isBold ? "bold" : ""}`}
                style={{ color: r.color }}
              >
                {r.icon && <i className={r.icon}></i>}
                <Tooltip title={r.value}>
                  <span>{r.value.length >= 20 ? r.value.toString().slice(0, 20) + "..." : r.value}</span>
                </Tooltip>
              </td>
            );
          })}
          <td className="actions">
            <Tooltip title="View">
              <div
                className="icon"
                onClick={() => setviewPopup({ goodsReceipted: item.GoodsReceipted, purchaseOrder: item.PurchaseOrder })}
              >
                <i className="fas fa-eye"></i>
              </div>
            </Tooltip>
            <Tooltip title="Edit">
              <div className="icon" onClick={() => setisEditable(item)}>
                <i className="fas fa-edit"></i>
              </div>
            </Tooltip>
            <Tooltip title="Comming Soon">
              <div className="icon" onClick={() => setpoTable(item.po)}>
                <span>CS</span>
              </div>
            </Tooltip>
            <Tooltip title="Comming Soon">
              <div className="icon" onClick={() => setgrTable(item.gr)}>
                <span>CS</span>
              </div>
            </Tooltip>
            <Tooltip title="Delete Line Item">
              <div className="icon" onClick={() => setpopupDelete(item.id)}>
                <i className="fas fa-minus"></i>
              </div>
            </Tooltip>
          </td>
        </tr>
        <div className={`nested-table ${nestedTable && nestedTable.id === item.id ? "show-nested-table" : ""}`}>
          {item.nestedTable2 && (
            <NestedTable data={item.nestedTable2} parentRowId={item.id} tableTitle={tableTitle} parentSearch={search} />
          )}
        </div>
      </div>
    ));
  }

  return (
    <div className="table-parent">
      <div className="header">
        <div className="search">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="search" value={search} onChange={searchTable} />
        </div>
        <div className="right">
          <Tooltip title="Add Line Item">
            <div className="icon" onClick={() => setaddPopup(true)}>
              <i className="fas fa-plus"></i>
            </div>
          </Tooltip>
          <TablePagination
            className="pagination"
            component="div"
            rowsPerPageOptions={[10, 25, 50, { label: "All", value: data.rows.length ? data.rows.length : -1 }]}
            count={data.rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </div>
      </div>
      <h1>{tableTitle}</h1>
      <div className="scroll-x">
        <table>
          <thead>
            <tr>
              {data.rows.length !== 0 && data.rows[0].nestedTable2 && <th className="open"></th>}
              {data.headers.map((item, index) => (
                <th key={item.dataRef} className={item.dataRef === "open" ? "open" : ""}>
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
              <th className="actions">Actions</th>
            </tr>
          </thead>
          <tbody>{renderTableRow()}</tbody>
        </table>
      </div>
      {viewPopup && <ViewPopup data={viewPopup} setisViewPopup={setviewPopup} />}
      {poTable && <ViewInlinePoTable data={poTable} setisViewPopup={setpoTable} />}
      {grTable && <ViewInlineGrTable data={grTable} setisViewPopup={setgrTable} />}

      <EditTableInvoice
        pdf={pdf}
        invoiceId={invoiceId}
        data={isEditable ? isEditable.row : []}
        lineitemid={isEditable ? isEditable.id : ""}
        isVisible={isEditable}
        setVisible={setisEditable}
        headers={data.headers}
        viewpo={viewpo}
        viewgr={viewgr}
      />

      <AddTableInvoice
        pdf={pdf}
        invoiceId={invoiceId}
        isVisible={addPopup}
        setVisible={setaddPopup}
        headers={data.headers}
      />
      <PopupConfirmation
        message={`Are you sure you want to delete line item ${popupDelete ? popupDelete : ""}?`}
        onClickTrue={() => dispatch(deleteLineItem(invoiceId, popupDelete, setpopupDelete))}
        trueText="Yes"
        onClickfalse={() => setpopupDelete(null)}
        falseText="Cancel"
        isVisible={popupDelete}
      />
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.object.isRequired,
  tableTitle: PropTypes.string,
  pdf: PropTypes.string,
  invoiceId: PropTypes.string,
  viewpo: PropTypes.object,
  viewgr: PropTypes.object,
};

export default Table;
