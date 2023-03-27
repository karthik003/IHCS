import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ButtonBase } from "@mui/material";

const ButtonPrimary = (props) => {
  const { link, text, icon, onClick, customClass } = props;
  return link ? (
    <Link className={`button-primary ${customClass}`} to={link}>
      {icon && <i className={icon}></i>}
      <p>{text}</p>
    </Link>
  ) : (
    <ButtonBase className={`button-primary ${customClass}`} onClick={onClick}>
      {icon && <i className={icon}></i>}
      <p>{text}</p>
    </ButtonBase>
  );
};

ButtonPrimary.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  customClass: PropTypes.string,
};

export default ButtonPrimary;
