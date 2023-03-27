import React from "react";
import Items from "./Items";
import ButtonIcon from "../../components/buttons/ButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleProfile } from "../../redux/actions/styles";
// import profilePicture from "../../media/images/profile-picture.png";

const Profile = () => {
  const dispatch = useDispatch();
  const AC = bindActionCreators({ toggleProfile }, dispatch);
  const { profileActive } = useSelector((state) => state.styles);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={`profile ${profileActive ? "profile-active" : ""}`}>
      <div className="container">
        <ButtonIcon icon="fas fa-times" customClass="close" onClick={() => AC.toggleProfile()} />

        <div className="content">
          <div className="title">
            <div className="avatar">
              <p>{user.username ? user.username.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}</p>
            </div>
            <h3>Profile</h3>
          </div>
          <Items />
        </div>
      </div>
      <div className="bg-dark" onClick={() => AC.toggleProfile()} />
    </div>
  );
};

export default Profile;
