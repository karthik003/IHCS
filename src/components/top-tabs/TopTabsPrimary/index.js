import React from "react";
import PropTypes from "prop-types";

const TopTabsPrimary = (props) => {
  const { data, activeTab, setactiveTab, children } = props;

  return (
    <div className="top-tabs-primary">
      <div className="tabs-container">
        {data.map((item) => (
          <div
            className={`tab ${item.name === activeTab ? "tab-active" : ""}`}
            key={item.name}
            onClick={() => setactiveTab(item.name)}
          >
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

TopTabsPrimary.propTypes = {
  data: PropTypes.array.isRequired,
  activeTab: PropTypes.string.isRequired,
  setactiveTab: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default TopTabsPrimary;
