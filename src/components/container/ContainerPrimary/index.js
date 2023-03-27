import React from "react";
import PropTypes from "prop-types";

const ContainerPrimary = (props) => {
  const { children, customClass } = props;
  return <div className={`container-primary ${customClass}`}>{children}</div>;
};

ContainerPrimary.propTypes = {
  children: PropTypes.node.isRequired,
  customClass: PropTypes.string,
};
export default ContainerPrimary;
