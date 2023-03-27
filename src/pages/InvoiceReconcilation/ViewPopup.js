import React from "react";
import PropTypes from "prop-types";
import ButtonIcon from "../../components/buttons/ButtonIcon";

const ViewPopup = (props) => {
  const {
    // eslint-disable-next-line no-unused-vars
    data: { goodsReceipted, purchaseOrder },
    setisViewPopup,
  } = props;

  return (
    <div className="view-popup">
      <div className="bg-dark" onClick={() => setisViewPopup(null)} />
      <ButtonIcon icon="fas fa-times" customClass="close" onClick={() => setisViewPopup(null)} />
      <div className="container">
        <h2>Purchase Order</h2>
        <table>
          <thead>
            <tr>
              {purchaseOrder.headers.map((item) => (
                <th key={item.name}>{item.name}</th>
              ))}
            </tr>
          </thead>
          {purchaseOrder.rows.length > 0 ? (
            <tbody>
              {purchaseOrder.rows.map((rowItem) => (
                <tr key={rowItem.id}>
                  {rowItem.row.map((item, index) => (
                    <td
                      key={index}
                      className={`${index === 0 ? "side-header" : ""} ${item.isBold ? "bold" : ""} ${
                        item.color === "green" ? "green" : item.color === "red" ? "red" : ""
                      }`}
                      style={{ color: item.color }}
                    >
                      <i className={item.icon}></i>
                      {item.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="no-res-feedback">No results found</div>
          )}
        </table>

        <h2>Goods Receipted</h2>
        <table>
          <thead>
            <tr>
              {goodsReceipted.headers.map((item) => (
                <th key={item.name}>{item.name}</th>
              ))}
            </tr>
          </thead>
          {goodsReceipted.rows.length > 0 ? (
            <tbody>
              {goodsReceipted.rows.map((rowItem) => (
                <tr key={rowItem.id}>
                  {rowItem.row.map((item, index) => (
                    <td
                      key={index}
                      className={`${index === 0 ? "side-header" : ""} ${item.isBold ? "bold" : ""} ${
                        item.color === "green" ? "green" : item.color === "red" ? "red" : ""
                      }`}
                      style={{ color: item.color }}
                    >
                      <i className={item.icon}></i>
                      {item.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="no-res-feedback">No results found</div>
          )}
        </table>
      </div>
    </div>
  );
};

ViewPopup.propTypes = {
  data: PropTypes.array.isRequired,
  setisViewPopup: PropTypes.func.isRequired,
};

export default ViewPopup;
