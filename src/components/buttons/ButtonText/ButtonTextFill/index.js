import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ButtonTextFill = (props) => {
  const { text, link } = props;
  return (
    <div className="button-text-fill">
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

ButtonTextFill.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default ButtonTextFill;
