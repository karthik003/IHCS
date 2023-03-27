import React from "react";
import PropTypes from "prop-types";

const SpeedDialPrimary = (props) => {
  const { data, onClick, active } = props;
  return (
    <div className="speed-dial-primary">
      <div className="container">
        <div className="items">
          {data.map((item) => (
            <div
              key={item.name}
              className={`item ${active && active.name === item.name ? "dial-active" : ""}`}
              onClick={() => onClick(item)}
            >
              <i className={item.icon}></i>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SpeedDialPrimary.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.object,
};

export default SpeedDialPrimary;
