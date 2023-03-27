/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import ContainerPrimary from "../../components/container/ContainerPrimary";
import InputPasswordIcon from "../../components/input/InputPasswordIcon";
import InputTextIcon from "../../components/input/InputTextIcon";
import ButtonIconTextFill from "../../components/buttons/ButtonSecondary/ButtonSecondaryFill";
import { login } from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";
import { emailValidation } from "../../functions/validations";
import ddLogo from "../../media/images/bg.png";

const Login = () => {
  const dispatch = useDispatch();
  const AC = bindActionCreators({ login }, dispatch);
  const { userLoading } = useSelector((state) => state.auth);

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");

  const [showForgotPassword, setshowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setforgotPasswordEmail] = useState("");

  function onChange(e) {
    seterror("");
    setloginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function onSubmitLogin() {
    AC.login(loginData.email, loginData.password, seterror);
  }

  async function pattiesLogin() {
    if (loginData.email && emailValidation(loginData.email)) {
      await axios.get(
        `https://e338elbpqa.execute-api.ap-southeast-2.amazonaws.com/default/ppa-dev-usermanagement?email=${loginData.email}`
      );
      window.open(process.env.REACT_APP_LOGIN_REDIRECT_URL, "_self");
    } else {
      seterror("Wrong Credentials.");
    }
  }

  function onSubmitForgotPassword(e) {
    e.preventDefault();
  }

  return (
    <div
      className="login"
      style={
        process.env.REACT_APP_NODE_ENV === "local"
          ? { background: "linear-gradient(180deg, #0051d8 0%, #000000 100%)" }
          : {}
      }
    >
      <div className="left">
        {process.env.REACT_APP_NODE_ENV === "local" ? (
          <img src={ddLogo} alt="provenio logo" className="provenioqa" />
        ) : (
          <img src={ddLogo} alt="provenio logo" />
        )}
      </div>

      <div className="right">
        {!showForgotPassword ? (
          <ContainerPrimary>
            <h1>LOG IN</h1>
            <form onSubmit={(e) => e.preventDefault()}>
              <InputTextIcon
                label="Username"
                name="email"
                value={loginData.email}
                onChange={onChange}
                icon="fas fa-user-shield"
                className="mb-5"
                error={error}
              />
              {(process.env.REACT_APP_NODE_ENV === "preprod" ||
                process.env.REACT_APP_NODE_ENV === "local" ||
                process.env.REACT_APP_NODE_ENV === "local") && (
                <InputPasswordIcon
                  label="Password"
                  name="password"
                  value={loginData.password}
                  onChange={onChange}
                  className="mb-5"
                  error={error}
                />
              )}
              {error && (
                <p
                  className="login-error"
                  style={
                    process.env.REACT_APP_NODE_ENV === "preprod" ||
                    process.env.REACT_APP_NODE_ENV === "local" ||
                    process.env.REACT_APP_NODE_ENV === "local"
                      ? { top: "66%" }
                      : { top: "60%" }
                  }
                >
                  {error}
                </p>
              )}
              <div className="action mb-3">
                <ButtonIconTextFill
                  text={userLoading ? null : "Log In"}
                  iconRight="fas fa-sign-in-alt"
                  onClick={() => {
                    process.env.REACT_APP_NODE_ENV === "preprod" ||
                    process.env.REACT_APP_NODE_ENV === "local" ||
                    process.env.REACT_APP_NODE_ENV === "local"
                      ? onSubmitLogin()
                      : pattiesLogin();
                  }}
                />
              </div>
              {/* <div className="forgot-password-text">
                <p onClick={() => setshowForgotPassword(true)}>Forgot your password? CLICK HERE</p>
              </div> */}
            </form>
          </ContainerPrimary>
        ) : (
          <ContainerPrimary>
            <h1>FORGOT PASSWORD</h1>
            <form onSubmit={onSubmitForgotPassword}>
              <InputTextIcon
                label="Username"
                value={forgotPasswordEmail}
                onChange={(e) => setforgotPasswordEmail(e.target.value)}
                icon="fas fa-user-shield"
                className="mb-5"
              />
              <div className="action mb-3">
                <ButtonIconTextFill text="Submit" iconRight="fas fa-sign-in-alt" />
              </div>
              <div className="forgot-password-text">
                <p onClick={() => setshowForgotPassword(false)}>Go back to Log In? CLICK HERE</p>
              </div>
            </form>
          </ContainerPrimary>
        )}
      </div>
    </div>
  );
};

export default Login;
