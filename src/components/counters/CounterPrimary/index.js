import React from "react";
import PropTypes from "prop-types";

const CounterPrimary = (props) => {
  const { data, onClick, customClass } = props;
  return (
    <div className={`counter-primary ${customClass}`} onClick={onClick}>
      <div className="container">
        <div className="counter">
          <p>{data.value}</p>
        </div>
        <div className="info">
          <p>{data.name}</p>
          <i className={data.icon}></i>
        </div>
      </div>
    </div>
  );
};

CounterPrimary.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  customClass: PropTypes.string,
};

export default CounterPrimary;
