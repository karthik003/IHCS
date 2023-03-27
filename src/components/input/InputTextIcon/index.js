import React from "react";
import PropTypes from "prop-types";

const InputTextIcon = (props) => {
  const { label, name, value, error, onChange, onBlur, icon, className } = props;

  return (
    <div className="input-text-icon">
      <div className={`container ${value ? "active-input" : ""} ${error ? "error-input" : ""} ${className}`}>
        <i className={icon}></i>
        <input type="text" name={name} value={value} onChange={onChange} onBlur={onBlur} />
        <label className={value ? "active-label" : ""}>{label}</label>
      </div>
    </div>
  );
};

InputTextIcon.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default InputTextIcon;
