import React from "react";
import PropTypes from "prop-types";

const TooltipPrimary = (props) => {
  const { children, text, counter, active, customClass } = props;
  return (
    <div className={`tooltip-primary ${customClass}`}>
      <div className="children">{children}</div>
      <div className="tooltip hd-mb">
        <p>{text}</p>
        {counter !== "" && <span className={`counter ${active ? "counter-active" : ""}`}>{counter}</span>}
      </div>
    </div>
  );
};

TooltipPrimary.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  customClass: PropTypes.string,
  counter: PropTypes.any,
  active: PropTypes.bool,
};

export default TooltipPrimary;
