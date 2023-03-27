/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import PdfViewPrimary from "../../components/pdf-view/PdfViewPrimary";
import { convertArrayToObject } from "../../functions/conversion";
import ButtonSecondaryFill from "../../components/buttons/ButtonSecondary/ButtonSecondaryFill";
import ContainerPrimary from "../../components/container/ContainerPrimary";
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { addLineItem } from "../../redux/actions/ap";
import { numberOnChange } from "../../functions/validations";
import InputCheckbox from "../../components/input/InputCheckbox";

const AddTableInvoice = (props) => {
  const { pdf, invoiceId, headers, isVisible, setVisible } = props;
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [editData, seteditData] = useState(convertArrayToObject(headers, "dataRef"));

  const { apLoading } = useSelector((state) => state.ap);
  const [copyPo, setcopyPo] = useState(false);

  useEffect(() => {
    seteditData(convertArrayToObject(headers, "dataRef"));
  }, [headers]);

  function onChange(e, type) {
    if (type === "number") {
      numberOnChange(e.target.value) && seteditData({ ...editData, [e.target.name]: e.target.value });
    } else {
      seteditData({ ...editData, [e.target.name]: e.target.value });
    }
  }

  function onSubmit() {
    dispatch(addLineItem(invoiceId, editData, setVisible, copyPo));
  }

  return (
    <div className={`edit-invoice-details ${isVisible ? "edit-invoice-details-active" : ""}`}>
      <ButtonPrimary text="Go Back" icon="fas fa-angle-double-left" onClick={() => setVisible(false)} />
      <h1>Add Line Item</h1>
      <div className="container">
        <PdfViewPrimary pdf={pdf} />

        <ContainerPrimary customClass="edit-view">
          <h2>Add Line Item</h2>
          <div className="edit">
            {headers.map((item, index) => (
              <div key={item.id} className="edit-input">
                <label>{item.name}</label>
                <input
                  type={item.type === "date" ? "date" : "text"}
                  name={item.dataRef}
                  placeholder={item.dataRef}
                  value={editData[item.dataRef] ? editData[item.dataRef] : ""}
                  onChange={(e) => onChange(e, item.type)}
                />
              </div>
            ))}
          </div>

          <InputCheckbox
            value={copyPo}
            onChange={(e) => setcopyPo(e.target.checked)}
            label="Copy PO to lines"
            id="addLine"
          />
          <ButtonSecondaryFill text={apLoading ? "" : "Submit"} onClick={onSubmit} />
        </ContainerPrimary>
      </div>
    </div>
  );
};

AddTableInvoice.propTypes = {
  pdf: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  invoiceId: PropTypes.string.isRequired,
  headers: PropTypes.array,
};

export default AddTableInvoice;
