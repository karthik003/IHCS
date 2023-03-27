import { CircularProgress } from "@mui/material";
import React from "react";
import ddLogo from "../../../media/images/bg.png";

const LoaderTertiary = () => {
  return (
    <div className="loader-tertiary">
      {process.env.REACT_APP_NODE_ENV === "local" ? (
        <img className="dd-logo" src={ddLogo} alt="dd logo" />
      ) : (
        <img src={ddLogo} alt="provenio logo" />
      )}
      <CircularProgress className="spinner" />
    </div>
  );
};

export default LoaderTertiary;
