import React from "react";
import proventioLogo from "../../media/images/proventio-logo.png";

const ComingSoon = () => {
  return (
    <div className="coming-soon">
      <div className="logo">
        <img src={proventioLogo} alt="proventio logo" />
      </div>
      <h1>Coming Soon</h1>
    </div>
  );
};

export default ComingSoon;
