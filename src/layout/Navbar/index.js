import React, { useEffect } from "react";
import ButtonIcon from "../../components/buttons/ButtonIcon";
// import profilePicture from "../../media/images/profile-picture.png";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleSidebar, toggleSettings, toggleProfile } from "../../redux/actions/styles";
import { refetchCounters } from "../../redux/actions/table";

import ButtonBase from "@mui/material/ButtonBase";
import proventioLogo from "../../media/images/proventio-logo.png";
import { useLocation } from "react-router-dom";
import NotificationPrimary from "../../components/notifications/NotificationPrimary";

const Navbar = () => {
  const dispatch = useDispatch();

  const { sidebarActive, notificationActive } = useSelector((state) => state.styles);
  const { lastUpdated } = useSelector((state) => state.timer);
  const { user } = useSelector((state) => state.auth);
  const AC = bindActionCreators({ toggleSidebar, toggleSettings, toggleProfile, refetchCounters }, dispatch);
  const location = useLocation();
  const params = location.pathname.replace("/reconcile/", "").split(/[./-_]/);

  useEffect(() => {
    const toggleMenu = () => {
      var element = document.querySelector(".navbar");
      element.classList.toggle("navbar-active");
    };
    const navbarBtn = document.querySelector(".navbar-btn");
    const navbarMiddleBtn = document.querySelectorAll(".navbar-middle-btn");
    navbarBtn && navbarBtn.addEventListener("click", toggleMenu);

    navbarMiddleBtn.length && [...navbarMiddleBtn].map((element) => element.addEventListener("click", toggleMenu));

    return () => {
      navbarBtn && navbarBtn.removeEventListener("click", toggleMenu);
      navbarMiddleBtn.length && [...navbarMiddleBtn].map((element) => element.removeEventListener("click", toggleMenu));
    };
  }, []);

  function pageTitle() {
    if (location.pathname.includes("/dashboard")) {
      return "Patient Information";
    } else if (location.pathname.includes("/reconcile")) {
      return "Patient Information";
    } else if (location.pathname.includes("/reconciliation")) {
      return "Patient Information";
    } else {
      return "Patient Information";
    }
  }

  return (
    <>
      <ButtonIcon icon="fas fa-align-left" customClass="navbar-btn hv-dstb" />
      <NotificationPrimary
        iconLeft={notificationActive.icon}
        text={notificationActive.text}
        active={notificationActive.isActive}
      />
      <div className={`navbar ${sidebarActive ? "sidebar-active" : ""}`}>
        <div className="left">
          <ButtonIcon
            icon={sidebarActive ? "fa-solid fa-bars" : "fa-solid fa-bars"}
            customClass="sidebar-btn hd-mb"
            onClick={() => AC.toggleSidebar()}
          />
          <h1 className="page-title hd-mb">
            {`${pageTitle()} ${process.env.REACT_APP_NODE_ENV === "preprod" ? "Preprod" : ""}`}
          </h1>
        </div>

        <p className="timer hd-dstb">
          Last Updated {lastUpdated === 0 ? "Just Now" : lastUpdated === 1 ? "a min ago" : `${lastUpdated} mins ago`}
        </p>
        <div className="right">
          <p className="timer hd-mb">
            Last Updated {lastUpdated === 0 ? "Just Now" : lastUpdated === 1 ? "a min ago" : `${lastUpdated} mins ago`}
          </p>
          {/* <ButtonBase className="icon">
            <i className="fas fa-bell"></i>
            <div className="indicator">
              <p>20+</p>
            </div>
          </ButtonBase> */}

          <ButtonBase
            className="icon"
            onClick={() => {
              if (location.pathname !== "/dashboard") {
                AC.refetchCounters(params[0], params[1]);
              }
            }}
          >
            <i className="fas fa-redo"></i>
          </ButtonBase>
          <ButtonBase className="icon" onClick={() => AC.toggleSettings()}>
            <i className="fas fa-cog"></i>
          </ButtonBase>
          <div className="profile" onClick={() => AC.toggleProfile()}>
            {/* <div className="image">
              <img src={profilePicture} alt="profile picture" />
            </div> */}
            <div className="avatar">
              <p>
                {user.username
                  ? user.username
                      .substring(user.username.indexOf("_") + 1)
                      .charAt(0)
                      .toUpperCase()
                  : user.email
                      .substring(user.email.indexOf("_") + 1)
                      .charAt(0)
                      .toUpperCase()}
              </p>
            </div>
            <p>
              {user.username
                ? user.username.substring(user.username.indexOf("_") + 1)
                : user.email.substring(user.email.indexOf("_") + 1)}
            </p>
          </div>
        </div>

        <div className="logo hd-dstb">
          <img src={proventioLogo} alt="proventio logo" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
