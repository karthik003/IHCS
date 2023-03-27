/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import PdfViewPrimary from "../../components/pdf-view/PdfViewPrimary";
import { convertArrayToObject, convertArrayToObjectValue } from "../../functions/conversion";
import ButtonSecondaryFill from "../../components/buttons/ButtonSecondary/ButtonSecondaryFill";
import ContainerPrimary from "../../components/container/ContainerPrimary";
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { changeApInvoiceDetailsTable } from "../../redux/actions/ap";
import { numberOnChange } from "../../functions/validations";
import InputCheckbox from "../../components/input/InputCheckbox";
import ViewPoSelectTable from "./ViewPoSelectTable";
import TopTabsPrimary from "../../components/top-tabs/TopTabsPrimary";
import ViewGrSelectTable from "./ViewGrSelectTable";

const EditTableInvoice = (props) => {
  const { pdf, invoiceId, lineitemid, data, headers, isVisible, setVisible, viewpo, viewgr } = props;
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [editData, seteditData] = useState(convertArrayToObject(data, "rowRef"));
  const [name, setname] = useState(convertArrayToObjectValue(headers, "dataRef", "name"));
  const [activeTab, setactiveTab] = useState("PDF View");
  const [selectedItem, setselectedItem] = useState([]);
  console.log("selectedItem", selectedItem);

  const { apLoading } = useSelector((state) => state.ap);
  const [copyPo, setcopyPo] = useState(false);

  useEffect(() => {
    seteditData({ ...editData });
  }, [selectedItem]);

  useEffect(() => {
    seteditData(convertArrayToObject(data, "rowRef"));
    // data.length && setselectedItem([data[0].value]);
  }, [data]);

  function onChange(e, type) {
    if (type === "number") {
      numberOnChange(e.target.value) && seteditData({ ...editData, [e.target.name]: e.target.value });
    } else {
      seteditData({ ...editData, [e.target.name]: e.target.value });
    }
  }

  function onSubmit() {
    dispatch(changeApInvoiceDetailsTable(invoiceId, lineitemid, editData, setVisible, copyPo, selectedItem));
  }

  return (
    <div className={`edit-invoice-details ${isVisible ? "edit-invoice-details-active" : ""}`}>
      <ButtonPrimary
        text="Go Back"
        icon="fas fa-angle-double-left"
        onClick={() => {
          setselectedItem([editData["Item_SL_No"]]);
          setactiveTab("PDF View");
          setVisible(false);
        }}
      />

      <h1>Edit Consultation/ Checkup Details</h1>

      <div className="container">
        <div style={{ width: "59%" }}>
          <TopTabsPrimary
            data={[{ name: "PDF View" }, { name: "Comming Soon" }, { name: "Comming Soon" }]}
            activeTab={activeTab}
            setactiveTab={setactiveTab}
          >
            {activeTab === "PDF View" && <PdfViewPrimary pdf={pdf} style={{ width: "100%" }} />}
            {activeTab === "Comming Soon" && (
              <ViewPoSelectTable
                tableTitle="Comming Soon"
                data={viewpo}
                setselectedItem={setselectedItem}
                selectedItem={selectedItem}
              />
            )}
            {activeTab === "Comming Soon" && <ViewGrSelectTable tableTitle="Comming Soon" data={viewgr} />}
          </TopTabsPrimary>
        </div>

        {/* {viewPoPopup === "viewpo" ? (
          <ViewPoSelectTable
            tableTitle="View PO"
            data={viewpo}
            onClosePopup={() => setviewPoPopup(false)}
            onSelectItem={(item) => setselectedItem(item.row[1].value)}
          />
        ) : (
          <PdfViewPrimary pdf={pdf} />
        )} */}

        <ContainerPrimary customClass="edit-view">
          <h2>Edit Consultation/ Checkup Details</h2>
          <div className="edit">
            {data.map(
              (item, index) =>
                item.isEditable && (
                  <div key={index} className="edit-input">
                    <label>{name[item.rowRef]}</label>
                    <input
                      type={item.type === "date" ? "date" : "text"}
                      name={item.rowRef}
                      placeholder={item.rowRef}
                      value={
                        item.rowRef === "Item_SL_No"
                          ? selectedItem.length
                            ? selectedItem
                            : editData[item.rowRef]
                          : editData[item.rowRef]
                          ? editData[item.rowRef]
                          : ""
                      }
                      onChange={(e) => onChange(e, item.type)}
                    />
                  </div>
                )
            )}
          </div>

          <InputCheckbox
            value={copyPo}
            onChange={(e) => setcopyPo(e.target.checked)}
            label="Copy PO to lines"
            id="editLine"
          />

          <ButtonSecondaryFill text={apLoading ? "" : "Submit"} onClick={onSubmit} />
        </ContainerPrimary>
      </div>
    </div>
  );
};

EditTableInvoice.propTypes = {
  pdf: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  lineitemid: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  invoiceId: PropTypes.string.isRequired,
  headers: PropTypes.array,
  viewpo: PropTypes.object,
  viewgr: PropTypes.object,
};

export default EditTableInvoice;
