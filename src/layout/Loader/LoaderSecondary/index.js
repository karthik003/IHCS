import { CircularProgress } from "@mui/material";
import React from "react";

const LoaderSecondary = () => {
  return (
    <div className="loader-secondary">
      <CircularProgress className="spinner" />
    </div>
  );
};

export default LoaderSecondary;
