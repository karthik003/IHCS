import React from "react";
import PropTypes from "prop-types";

const SelectEdit = (props) => {
  const { label, name, value, error, onChange, onBlur, icon, className } = props;

  return (
    <div className="select-edit">
      <div className={`container ${value ? "active-input" : ""} ${error ? "error-input" : ""} ${className}`}>
        {icon && <i className={icon}></i>}
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={{ color: value === "" ? "#575656" : "inherit" }}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <label className={value ? "active-label" : ""}>{label}</label>
      </div>
    </div>
  );
};

SelectEdit.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
};

export default SelectEdit;
