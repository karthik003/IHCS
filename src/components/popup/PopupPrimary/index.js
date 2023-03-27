import React from "react";
import ButtonIcon from "../../buttons/ButtonIcon";
import PropTypes from "prop-types";

const PopupPrimary = (props) => {
  const { children, onClose, customClass } = props;
  return (
    <div className={`popup-primary ${customClass}`}>
      {children}
      <ButtonIcon icon="fas fa-times" customClass="cross" onClick={onClose} />
    </div>
  );
};

PopupPrimary.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  customClass: PropTypes.string,
};
export default PopupPrimary;
