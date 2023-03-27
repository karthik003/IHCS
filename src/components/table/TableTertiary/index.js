import React from "react";
import PropTypes from "prop-types";

const TableTertiary = (props) => {
  const { data, customclass } = props;
  return (
    <div className={`table-tertiary ${customclass}`}>
      {data.map((item, index) => (
        <div key={index}>Hi</div>
      ))}
    </div>
  );
};

TableTertiary.propTypes = {
  data: PropTypes.array.isRequired,
  customclass: PropTypes.string,
};

export default TableTertiary;
