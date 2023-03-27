import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CircularProgress } from "@mui/material";

const ButtonSecondaryFill = (props) => {
  const { text, link, iconLeft, iconRight, onClick } = props;
  return (
    <div className="button-icon-text-fill">
      {link ? (
        <Link className="button" to={link}>
          {iconLeft && <i className={`${iconLeft} icon-left`}></i>}
          {text}
          {iconRight && <i className={`${iconRight} icon-right`}></i>}
        </Link>
      ) : text ? (
        <button className="button" onClick={onClick}>
          {iconLeft && <i className={`${iconLeft} icon-left`}></i>}
          {text}
          {iconRight && <i className={`${iconRight} icon-right`}></i>}
        </button>
      ) : (
        <button className="button">
          <CircularProgress className="spinner" size={15} />
        </button>
      )}
    </div>
  );
};

ButtonSecondaryFill.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonSecondaryFill;
