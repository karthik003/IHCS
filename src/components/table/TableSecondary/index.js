import React from "react";
import PropTypes from "prop-types";
import { ButtonBase } from "@mui/material";

const Tablesecondary = (props) => {
  const { data, seteditInvoiceVisible, customClass } = props;
  return (
    <div className={`table-secondary ${customClass}`}>
      <div className="header">
        <h1>Patient Details</h1>
        <ButtonBase className="icon" onClick={() => seteditInvoiceVisible(true)}>
          <i className="fas fa-edit"></i>
        </ButtonBase>
      </div>
      <div className="container">
        {data.map((item) => (
          <div key={item.id} className="data">
            <div className="flex">
              <p className="name">{item.name}</p>
              {item.icon && (
                <i
                  className={`${item.icon} ${item.iconcolor === "green" ? "green" : ""} ${
                    item.color === "red" ? "red" : ""
                  }`}
                  style={{ color: item.iconcolor }}
                ></i>
              )}
            </div>

            <p
              className={`value ${item.color === "green" ? "green" : ""} ${item.color === "red" ? "red" : ""} ${
                item.isBold ? "bold" : ""
              }`}
              style={{ color: item.color }}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

Tablesecondary.propTypes = {
  data: PropTypes.array.isRequired,
  seteditInvoiceVisible: PropTypes.func.isRequired,
  customClass: PropTypes.string,
};

export default Tablesecondary;
