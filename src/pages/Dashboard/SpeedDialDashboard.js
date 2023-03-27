import React, { useState } from "react";
import ButtonSecondaryFill from "../../components/buttons/ButtonSecondary/ButtonSecondaryFill";
import PopupPrimary from "../../components/popup/PopupPrimary";
import SpeedDialSecondary from "../../components/speed-dial/SpeedDialSecondary";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getApRetrieve,
  getApSharePoint,
  apFileUpload,
  resetApReconcilationPost,
  exportRangeAp,
  resetApUpload,
} from "../../redux/actions/ap";
import LoaderSecondary from "../../layout/Loader/LoaderSecondary";
import AnimatedCheck from "../../components/ui/AnimatedCheck";
import { ButtonBase, Tooltip } from "@mui/material";

const speedDialData = [
  {
    name: "Upload",
    ref: "input",
    icon: "fas fa-file-upload",
    action: "popup",
  },
  // {
  //   name: "Input",
  //   ref: "input",
  //   icon: "fas fa-upload",
  //   action: "submenu",
  //   submenu: [
  //     {
  //       name: "Upload",
  //       ref: "input",
  //       icon: "fas fa-file-upload",
  //       action: "popup",
  //     },
  //     {
  //       name: "Retrieve",
  //       ref: "input",
  //       icon: "fas fa-file-import",
  //       action: "popup",
  //     },

  //     {
  //       name: "Share Point",
  //       ref: "input",
  //       icon: "fas fa-draw-polygon",
  //       action: "popup",
  //     },
  //   ],
  // },
  // {
  //   name: "Export",
  //   ref: "export",
  //   icon: "fas fa-download",
  //   action: "popup",
  // },
  // {
  //   name: "Reconcile",
  //   ref: "reconcile",
  //   icon: "fas fa-chart-bar",
  //   action: "navigate",
  //   path: "/reconcile/all",
  // },
];

const SpeedDialDashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const AC = bindActionCreators(
    {
      getApRetrieve,
      getApSharePoint,
      apFileUpload,
      resetApReconcilationPost,
      exportRangeAp,
      resetApUpload,
    },
    dispatch
  );
  const { apUpload, apRetrieve, apSharePoint, apReconcilation, apLoading, apError } = useSelector((state) => state.ap);

  const [upload, setupload] = useState(null);
  const [popup, setpopup] = useState(null);
  const [exportDate, setexportDate] = useState({ from: "", to: "" });

  function displayPopup(item) {
    if (item.action === "popup") {
      setpopup(item);
      if (item.name === "Retrieve") {
        AC.getApRetrieve();
      }
      if (item.name === "Share Point") {
        AC.getApSharePoint();
      }
    }
    if (item.action === "navigate") {
      history.push(item.path);
    }
  }

  function onSubmitUpload() {
    if (upload) {
      AC.apFileUpload(upload);
    }
  }

  function onClosePopup() {
    setpopup(null);
    AC.resetApUpload();
    AC.resetApReconcilationPost();
    setupload(null);
    setexportDate({ from: "", to: "" });
  }

  function onresetApUpload() {
    AC.resetApUpload();
    setupload(null);
  }

  return (
    <div className="speed-dial-dashboard">
      <SpeedDialSecondary data={speedDialData} onClick={displayPopup} active={popup} onClose={onClosePopup} />
      {popup && popup.name === "Upload" && (
        <PopupPrimary customClass="upload-popup-primary" onClose={onClosePopup}>
          {apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>uploading ...</p>
            </div>
          ) : apUpload === "success" ? (
            <div className="success">
              <div className="check">
                <i className="fas fa-check"></i>
              </div>
              <div className="feedback">
                <p>Successfully uploaded</p>
                <ButtonBase className="icon" onClick={onresetApUpload}>
                  <i className="fas fa-redo"></i>
                </ButtonBase>
              </div>
            </div>
          ) : apError ? (
            <div className="fail">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="feedback">
                <ButtonBase className="icon" onClick={onresetApUpload}>
                  <i className="fas fa-redo"></i>
                </ButtonBase>
                <p>Failed to upload the file</p>
              </div>
            </div>
          ) : (
            <>
              <input id="ip-file" type="file" multiple className="file" onChange={(e) => setupload(e.target.files)} />
              <label htmlFor="ip-file">
                {upload ? <i className="fas fa-check"></i> : <i className="fas fa-upload"></i>}
              </label>
              {upload ? <p>{upload.length} files selected</p> : <p>Choose file</p>}
              <ButtonSecondaryFill text="Upload" onClick={onSubmitUpload} />
            </>
          )}
        </PopupPrimary>
      )}

      {popup && popup.name === "Retrieve" && (
        <PopupPrimary customClass="retrieve-popup-primary" onClose={onClosePopup}>
          {/* <h2>Retrieve</h2> */}
          {apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Fetching ...</p>
            </div>
          ) : (
            <div className="content">
              {!apError ? (
                <AnimatedCheck text={apRetrieve.count} />
              ) : (
                <div className="times">
                  <i className="fas fa-times"></i>
                </div>
              )}
              {!apError ? (
                <div className="text">
                  <p>{apRetrieve.message}</p>
                  <Tooltip title="Refetch" arrow>
                    <ButtonBase className="icon" onClick={() => AC.getApRetrieve()}>
                      <i className="fas fa-redo"></i>
                    </ButtonBase>
                  </Tooltip>
                </div>
              ) : (
                <div className="text">
                  <p>{apError}</p>
                  <Tooltip title="Refetch" arrow>
                    <ButtonBase className="icon" onClick={() => AC.getApRetrieve()}>
                      <i className="fas fa-redo"></i>
                    </ButtonBase>
                  </Tooltip>
                </div>
              )}
            </div>
          )}
        </PopupPrimary>
      )}

      {popup && popup.name === "Share Point" && (
        <PopupPrimary customClass="sharepoint-popup-primary" onClose={onClosePopup}>
          {/* <h2>Share Point</h2> */}
          {apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Fetching ...</p>
            </div>
          ) : (
            <div className="content">
              {!apError ? (
                <AnimatedCheck text={apSharePoint.count} />
              ) : (
                <div className="times">
                  <i className="fas fa-times"></i>
                </div>
              )}
              {!apError ? (
                <div className="text">
                  <p>{apSharePoint.message}</p>
                  <Tooltip title="Refetch" arrow>
                    <ButtonBase className="icon" onClick={() => AC.getApSharePoint()}>
                      <i className="fas fa-redo"></i>
                    </ButtonBase>
                  </Tooltip>
                </div>
              ) : (
                <div className="text">
                  <p>{apError}</p>
                  <Tooltip title="Refetch" arrow>
                    <ButtonBase className="icon" onClick={() => AC.getApSharePoint()}>
                      <i className="fas fa-redo"></i>
                    </ButtonBase>
                  </Tooltip>
                </div>
              )}
            </div>
          )}
        </PopupPrimary>
      )}

      {popup && popup.name === "Export" && (
        <PopupPrimary customClass="export-popup-primary" onClose={onClosePopup}>
          {apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Exporting ...</p>
            </div>
          ) : apError ? (
            <div className="content">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="text">
                <p>{apError}</p>
                <Tooltip title="Refetch" arrow>
                  <ButtonBase className="icon" onClick={() => AC.exportRangeAp(exportDate.from, exportDate.to)}>
                    <i className="fas fa-redo"></i>
                  </ButtonBase>
                </Tooltip>
              </div>
            </div>
          ) : apReconcilation ? (
            <div className="popup-export">
              <p>{apReconcilation.message}</p>
              <div>
                <button
                  onClick={() => {
                    window.open(apReconcilation.url, "_blank");
                    onClosePopup();
                  }}
                >
                  Ok
                </button>
                <button onClick={onClosePopup}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="input-container">
                <div className="date-container">
                  <p>From</p>
                  <input
                    type="date"
                    className="date"
                    value={exportDate.from}
                    onChange={(e) => setexportDate({ ...exportDate, from: e.target.value })}
                  />
                </div>
                <div className="date-container">
                  <p>To</p>
                  <input
                    type="date"
                    className="date"
                    value={exportDate.to}
                    onChange={(e) => setexportDate({ ...exportDate, to: e.target.value })}
                  />
                </div>
              </div>
              <div className="actions">
                <div className="action">
                  <div className="button" onClick={() => AC.exportRangeAp(exportDate.from, exportDate.to)}>
                    <i className="fas fa-download"></i>
                  </div>
                  <p>Export</p>
                </div>
              </div>
            </>
          )}
        </PopupPrimary>
      )}
    </div>
  );
};

export default SpeedDialDashboard;
