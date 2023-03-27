import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ButtonIcon = (props) => {
  const { icon, link, onClick, customClass } = props;
  return link ? (
    <Link className={`button-icon ${customClass}`}>
      <i className={icon}></i>
    </Link>
  ) : (
    <button className={`button-icon ${customClass}`} onClick={onClick}>
      <i className={icon}></i>
    </button>
  );
};

ButtonIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func,
  customClass: PropTypes.string,
};
export default ButtonIcon;
