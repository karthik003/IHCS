import PropTypes from "prop-types";
import React from 'react'

function SummaryTable(props) {
    const { customClass,summary } = props;
    return (
        <div className={`table-secondary ${customClass}`}>
        <div className="header">
          <h1>Summary</h1><br />
        </div>
        <p>{summary}</p>
        </div>
      )
}
SummaryTable.propTypes = {
    customClass: PropTypes.string,
    summary:PropTypes.string
};
  
export default SummaryTable