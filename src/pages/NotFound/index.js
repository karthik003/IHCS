import React from "react";
import proventioLogo from "../../media/images/proventio-logo.png";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="logo">
        <img src={proventioLogo} alt="proventio logo" />
      </div>
      <h1>404 Not Found</h1>
    </div>
  );
};

export default NotFound;
