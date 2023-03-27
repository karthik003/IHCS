/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const InputList = (props) => {
  const { type, label, name, options, value, error, onChange, onBlur, className, onClickList, required } = props;

  const [displayOptions, setdisplayOptions] = useState(options);

  useEffect(() => {
    if (value || value !== "") {
      const filteredOptions = options.filter((item) => item.includes(value));
      setdisplayOptions(filteredOptions);
    } else {
      setdisplayOptions(options);
    }
  }, [value]);

  return (
    <form autoComplete="new-password" className={`input-list ${className}`} onSubmit={(e) => e.preventDefault()}>
      <div className={`container ${value ? "active-input" : ""} ${error ? "error-input" : ""}`}>
        <input
          type={type ? type : "text"}
          name={name}
          list={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete="off"
          required={required}
        />
        {displayOptions && displayOptions.length !== 0 && (
          <div className="list">
            {displayOptions.map((item, index) => (
              <div key={index} className="item" onClick={() => onClickList(item)}>
                <p>{item}</p>
              </div>
            ))}
          </div>
        )}

        <label className={value ? "active-label" : ""}>{error ? error : label}</label>
        {/* <i className="fas fa-caret-down"></i> */}
      </div>
    </form>
  );
};

InputList.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  options: PropTypes.array,
  onClickList: PropTypes.func,
  required: PropTypes.bool,
};

export default InputList;
