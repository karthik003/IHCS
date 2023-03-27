import React from "react";
import PropTypes from "prop-types";

const FeedbackPrimary = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { text, iconLeft, iconRight, iconColor, active, className } = props;
  return (
    <div className={`notification-primary ${active ? "notification-active" : ""} ${className}`}>
      {iconLeft && <i className={`icon-left ${iconLeft}`}></i>}
      <p>{text}</p>
      {iconRight && <i className={`icon-right ${iconRight}`}></i>}
    </div>
  );
};

FeedbackPrimary.propTypes = {
  text: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  iconColor: PropTypes.string,
  active: PropTypes.bool,
  className: PropTypes.string,
};

export default FeedbackPrimary;
