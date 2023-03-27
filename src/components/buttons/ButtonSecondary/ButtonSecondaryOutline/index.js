import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ButtonSecondaryOutline = (props) => {
  const { text, link, iconLeft, iconRight } = props;
  return (
    <div className="button-icon-text-outline">
      {link ? (
        <Link className="button" to={link}>
          {iconLeft && <i className={`${iconLeft} icon-left`}></i>}
          {text}
          {iconRight && <i className={`${iconRight} icon-right`}></i>}
        </Link>
      ) : (
        <button className="button">
          {iconLeft && <i className={`${iconLeft} icon-left`}></i>}
          {text}
          {iconRight && <i className={`${iconRight} icon-right`}></i>}
        </button>
      )}
    </div>
  );
};

ButtonSecondaryOutline.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
};

export default ButtonSecondaryOutline;
