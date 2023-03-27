import React from "react";
import PropTypes from "prop-types";

const AnimatedCheck = (props) => {
  const { text } = props;
  return (
    <div className="animated-check">
      <i className="fas fa-check"></i>
      <p>{text}</p>
    </div>
  );
};

AnimatedCheck.propTypes = {
  text: PropTypes.any.isRequired,
};

export default AnimatedCheck;
