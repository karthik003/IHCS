import Switch from "@mui/material/Switch";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { setTheme } from "../../redux/actions/styles";

const Theme = () => {
  const dispatch = useDispatch();
  const AC = bindActionCreators({ setTheme }, dispatch);
  const { darkTheme } = useSelector((state) => state.styles);

  useEffect(() => {
    // Access theme from localstorage
    const theme = localStorage.getItem("theme");

    if (theme) {
      document.body.classList.add(theme);
      AC.setTheme(true);
    }
  }, []);

  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [darkTheme]);

  return (
    <div className="theme">
      <p>Theme</p>
      <Switch color="primary" checked={darkTheme} onChange={() => AC.setTheme(!darkTheme)} />
    </div>
  );
};

export default Theme;
