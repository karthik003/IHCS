import React from "react";
import PropTypes from "prop-types";

const ActionsPopup = (props) => {
  const { data, setactions, seteditUser } = props;

  return (
    <div className="actions-popup">
      <div className="bg-dark" onClick={() => setactions(false)} />
      <div className="popup">
        <h3>User {data.id}</h3>
        <div className="tab" onClick={() => seteditUser(true)}>
          <i className="fas fa-user-edit user-edit"></i>
          <p>Edit User</p>
        </div>
        <div className="tab">
          <i className="fas fa-user-check user-enable"></i>
          <p>Enable User</p>
        </div>
        <div className="tab">
          <i className="fas fa-user-slash user-disable"></i>
          <p>Disable User</p>
        </div>
        <div className="tab">
          <i className="fas fa-user-times user-times user-remove"></i>
          <p>Remove User</p>
        </div>
      </div>
    </div>
  );
};

ActionsPopup.propTypes = {
  data: PropTypes.object.isRequired,
  setactions: PropTypes.func.isRequired,
  seteditUser: PropTypes.func.isRequired,
};

export default ActionsPopup;
