import React from "react";
import PropTypes from "prop-types";

const PopupConfirmation = (props) => {
  const { message, onClickTrue, trueText, onClickfalse, falseText, customClass, isVisible } = props;

  return (
    <div className={`popup-confirmation ${isVisible ? "popup-confirmation-visible" : ""} ${customClass}`}>
      <div className="container">
        <p>{message}</p>
        <div>
          <button onClick={onClickTrue} className="true">
            {trueText}
          </button>
          <button onClick={onClickfalse} className="false">
            {falseText}
          </button>
        </div>
      </div>
      <div className="bg-dark" onClick={onClickfalse} />
    </div>
  );
};

PopupConfirmation.propTypes = {
  message: PropTypes.string.isRequired,
  onClickTrue: PropTypes.func.isRequired,
  onClickfalse: PropTypes.func.isRequired,
  trueText: PropTypes.string.isRequired,
  falseText: PropTypes.string.isRequired,
  customClass: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default PopupConfirmation;
