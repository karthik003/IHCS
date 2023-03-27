/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import SpeedDialDashboard from "./SpeedDialDashboard";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getApIframe, setIframeLoading } from "../../redux/actions/iframe";
import LoaderPrimary from "../../layout/Loader/LoaderPrimary";
// import Dashboard from "./Dashboard";

const Freight = () => {
  const dispatch = useDispatch();
  const AC = bindActionCreators({ getApIframe, setIframeLoading }, dispatch);
  const { apIframe, iframeLoading } = useSelector((state) => state.iframe);
  // const { darkTheme } = useSelector((state) => state.styles);

  useEffect(() => {
    AC.getApIframe();
    return () => {
      AC.setIframeLoading(true);
    };
  }, []);

  if (iframeLoading) {
    return <LoaderPrimary />;
  }

  return (
    <div className="ap">
      <SpeedDialDashboard />
      <div
        className="iframe-container"
        dangerouslySetInnerHTML={{
          __html: `<iframe class="iframe" src=${apIframe.iframeUrl} />`,
        }}
      />
    </div>
  );
};

export default Freight;
