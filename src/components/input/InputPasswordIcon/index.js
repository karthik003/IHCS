import React, { useState } from "react";
import PropTypes from "prop-types";

const InputPasswordIcon = (props) => {
  const [visible, setvisible] = useState(false);
  const { label, name, value, error, onChange, onBlur, icon, className } = props;

  function toggleVisibility() {
    !icon && setvisible(!visible);
  }
  return (
    <div className="input-password-icon">
      <div className={`container ${value ? "active-input" : ""} ${error ? "error-input" : ""} ${className}`}>
        <i className={icon ? icon : visible ? "fas fa-eye-slash" : "fas fa-eye"} onClick={toggleVisibility}></i>
        <input type={visible ? "text" : "password"} name={name} value={value} onChange={onChange} onBlur={onBlur} />
        <label className={value ? "active-label" : ""}>{label}</label>
      </div>
    </div>
  );
};

InputPasswordIcon.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default InputPasswordIcon;
