import React from "react";
import PropTypes from "prop-types";

const LoaderPrimary = (props) => {
  const { isFull } = props;
  return (
    <div className={`loader-primary ${isFull ? "loader-primary-full" : ""}`}>
      <div className="loader">
        <div className="loader bl"></div>
        <div className="loader tr"></div>
        <div className="loader br"></div>
        <div className="loader tl"></div>
      </div>
    </div>
  );
};

LoaderPrimary.propTypes = {
  isFull: PropTypes.bool,
};

export default LoaderPrimary;
