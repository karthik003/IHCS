import React from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../redux/actions/auth";

const Items = () => {
  const dispatch = useDispatch();
  const AC = bindActionCreators({ logout }, dispatch);

  return (
    <div className="items">
      <div
        className="button"
        onClick={() => {
          AC.logout();
        }}
      >
        <i className="fas fa-power-off"></i>
        <p>Log Out</p>
      </div>
    </div>
  );
};

export default Items;
