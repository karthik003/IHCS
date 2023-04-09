/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import ButtonSecondaryFill from "../../components/buttons/ButtonSecondary/ButtonSecondaryFill";
import ContainerPrimary from "../../components/container/ContainerPrimary";
import InputCheckbox from "../../components/input/InputCheckbox";
import PdfViewPrimary from "../../components/pdf-view/PdfViewPrimary";
import PropTypes from "prop-types";
import { changeApInvoiceDetails } from "../../redux/actions/ap";
import { convertArrayToObject } from "../../functions/conversion";
import { numberOnChange } from "../../functions/validations";

const EditInvoiceDetails = (props) => {
  const { pdf, invoiceId, data, isVisible, setVisible } = props;
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [editData, seteditData] = useState(convertArrayToObject(data, "id"));

  const { apLoading } = useSelector((state) => state.ap);
  const [copyPo, setcopyPo] = useState(false);

  function onChange(e, type) {
    if (type === "number") {
      numberOnChange(e.target.value) && seteditData({ ...editData, [e.target.name]: e.target.value });
    } else {
      seteditData({ ...editData, [e.target.name]: e.target.value });
    }
  }

  function onSubmit() {
    dispatch(changeApInvoiceDetails(invoiceId, editData, setVisible, copyPo));
  }

  return (
    <div className={`edit-invoice-details ${isVisible ? "edit-invoice-details-active" : ""}`}>
      <ButtonPrimary text="Go Back" icon="fas fa-angle-double-left" onClick={() => setVisible(false)} />
      <h1>Edit Patient Details</h1>

      <div className="container">
        <PdfViewPrimary pdf={pdf} />

        <ContainerPrimary customClass="edit-view">
          <h2>Edit Patient Details</h2>
          <div className="edit">
            {data.map(
              (item, index) =>
                item.isEditable && (
                  <div key={index} className="edit-input">
                    <label>{item.name}</label>
                    <input
                      type={item.type === "date" ? "date" : "text"}
                      name={item.id}
                      placeholder={item.name}
                      value={editData[item.id]}
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
            id="editInvoice"
          />

          <ButtonSecondaryFill text={apLoading ? "" : "Submit"} onClick={onSubmit} />
        </ContainerPrimary>
      </div>
    </div>
  );
};

EditInvoiceDetails.propTypes = {
  pdf: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isVisible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  invoiceId: PropTypes.string.isRequired,
};

export default EditInvoiceDetails;
