import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ButtonTextOutline = (props) => {
  const { text, link } = props;
  return (
    <div className="button-text-outline">
      {link ? (
        <Link className="button" to={link}>
          {text}
        </Link>
      ) : (
        <button className="button">{text}</button>
      )}
    </div>
  );
};

ButtonTextOutline.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default ButtonTextOutline;
