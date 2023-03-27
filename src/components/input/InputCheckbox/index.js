import React from "react";
import PropTypes from "prop-types";

const InputCheckbox = (props) => {
  const { value, onChange, label, id } = props;
  return (
    <div className="input-checkbox">
      <input type="checkbox" name="switch" id={id} value={value} onChange={onChange} />
      <label htmlFor={id}></label>
      <p>{label}</p>
    </div>
  );
};

InputCheckbox.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  id: PropTypes.any,
};

export default InputCheckbox;
