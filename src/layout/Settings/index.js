import React from "react";
import Theme from "./Theme";
import ButtonIcon from "../../components/buttons/ButtonIcon";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleSettings } from "../../redux/actions/styles";

const Settings = () => {
  const dispatch = useDispatch();
  const AC = bindActionCreators({ toggleSettings }, dispatch);
  const { settingsActive } = useSelector((state) => state.styles);

  return (
    <div className={`settings ${settingsActive ? "settings-active" : ""}`}>
      <div className="container">
        <ButtonIcon icon="fas fa-times" customClass="close" onClick={() => AC.toggleSettings()} />

        <div className="content">
          <div className="title">
            <i className="fas fa-cog"></i>
            <h3>Settings</h3>
          </div>
          <Theme />
        </div>
      </div>
      <div className="bg-dark" onClick={() => AC.toggleSettings()} />
    </div>
  );
};

export default Settings;
