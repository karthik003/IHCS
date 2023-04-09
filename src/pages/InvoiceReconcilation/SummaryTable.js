import PropTypes from "prop-types";
import React from 'react'

function SummaryTable(props) {
    const { customClass } = props;
    return (
        <div className={`table-secondary ${customClass}`}>
        <div className="header">
          <h1>Summmary</h1>
        </div>
        </div>
      )
}
SummaryTable.propTypes = {
    customClass: PropTypes.string,
};
  
export default SummaryTable