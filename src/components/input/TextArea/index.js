/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";

const TextArea = (props) => {
  const { label, name, value, error, onChange, rows, onBlur, className, placeholder } = props;

  return (
    <div className="text-area">
      <div className={`container ${value ? "active-input" : ""} ${error ? "error-input" : ""} ${className}`}>
        <textarea
          rows={rows}
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {/* <label className={value ? "active-label" : ""}>{label}</label> */}
      </div>
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  rows: PropTypes.number,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextArea;
