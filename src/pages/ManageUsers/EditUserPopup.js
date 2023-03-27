import React, { useState } from "react";
import PropTypes from "prop-types";
import InputEdit from "../../components/input/InputEdit";
import ButtonIcon from "../../components/buttons/ButtonIcon";
import SelectEdit from "../../components/input/SelectEdit";
import ButtonSecondaryFill from "../../components/buttons/ButtonSecondary/ButtonSecondaryFill";

const EditUserPopup = (props) => {
  const { user, editUser, seteditUser, setactions } = props;

  if (user === null) {
    return <div className="edit-user-popup"></div>;
  }

  // const [firstName, setfirstName] = useState(user.row[2].value);
  // const [lastName, setlastName] = useState(user.row[3].value);
  // const [empId, setempId] = useState(user.row[5].value);
  // const [email, setemail] = useState(user.row[0].value);
  // const [username, setuserName] = useState(user.row[1].value);

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [empId, setempId] = useState("");
  const [email, setemail] = useState("");
  const [username, setuserName] = useState("");
  const [role, setrole] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [image, setimage] = useState(null);

  function onClose() {
    seteditUser(false);
    setTimeout(() => {
      setactions(null);
    }, 50);
  }

  function onChangeImage(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setimage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  return (
    <div className={`edit-user-popup ${editUser ? "edit-user-popup-active" : ""}`}>
      <ButtonIcon icon="fas fa-times" onClick={onClose} />
      <h1>Edit User {user.id}</h1>

      <div className="user">
        <input id="dp-file" type="file" accept="image/*" className="file" onChange={onChangeImage} />
        <label htmlFor="dp-file" className="img">
          <img
            src={
              image
                ? image
                : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            }
            alt="profile picture"
          />
          <div className="info">
            <p>Change</p>
          </div>
          <i className="fas fa-pencil-alt"></i>
        </label>
        <InputEdit value={firstName} label="First Name" onChange={(e) => setfirstName(e.target.value)} />
        <InputEdit value={lastName} label="Last Name" onChange={(e) => setlastName(e.target.value)} />
      </div>

      <div className="content">
        <InputEdit value={empId} label="Employee ID" onChange={(e) => setempId(e.target.value)} />
        <InputEdit value={username} label="User Name" onChange={(e) => setuserName(e.target.value)} />
        <InputEdit value={email} label="Email" onChange={(e) => setemail(e.target.value)} />
        <SelectEdit value={role} onChange={(e) => setrole(e.target.value)} />
      </div>
      <ButtonSecondaryFill text="Change Details" iconLeft="fas fa-user-check" />
    </div>
  );
};

EditUserPopup.propTypes = {
  user: PropTypes.object,
  editUser: PropTypes.bool.isRequired,
  seteditUser: PropTypes.func,
  setactions: PropTypes.func,
};

export default EditUserPopup;
