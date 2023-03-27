import React from "react";
import PropTypes from "prop-types";

const SpeedDialSecondary = (props) => {
  const { data, onClick, active, onClose } = props;

  return (
    <div className={`speed-dial-secondary ${active ? "speed-dial-secondary-active" : ""}`}>
      <div className="button" onClick={onClose}>
        <i className={active && active.action === "popup" ? "fas fa-times" : "fa-solid fa-circle-chevron-up"}></i>
      </div>
      <div className="container">
        {data.map((item) => (
          <div key={item.name} className="item" onClick={() => onClick(item)}>
            <p className="menu-text">{item.name}</p>
            <i className={`${item.icon} menu-icon ${active && active.ref === item.ref ? "dial-active" : ""}`}></i>
            <div className="submenu-container">
              {item.submenu &&
                item.submenu.map((subItem) => (
                  <div key={subItem.name} className="item" onClick={() => onClick(subItem)}>
                    <p className="menu-text">{subItem.name}</p>
                    <i
                      className={`${subItem.icon} menu-icon ${
                        active && active.name === subItem.name ? "dial-active" : ""
                      }`}
                    ></i>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-dark" />
    </div>
  );
};

SpeedDialSecondary.propTypes = {
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.object,
  onClose: PropTypes.func,
};

export default SpeedDialSecondary;
