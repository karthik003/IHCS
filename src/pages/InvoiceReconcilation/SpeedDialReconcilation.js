import React, { useState, useEffect } from "react";
import ButtonSecondaryFill from "../../components/buttons/ButtonSecondary/ButtonSecondaryFill";
import PopupPrimary from "../../components/popup/PopupPrimary";
import { useHistory } from "react-router-dom";
import SpeedDialSecondary from "../../components/speed-dial/SpeedDialSecondary";
import TextArea from "../../components/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  apReconcilationPost,
  apReconcilationPostProcess,
  apReconcilationPostStop,
  apReconcilationPostApprove,
  resetApReconcilationPost,
  apReconcilationPostOverride,
  exportAp,
} from "../../redux/actions/ap";
import LoaderSecondary from "../../layout/Loader/LoaderSecondary";
import ViewPoTable from "./ViewPoTable";
import InputList from "../../components/input/InputList";
import { emailValidation, notEmptyValidation } from "../../functions/validations";
import PropTypes from "prop-types";

const speedDialData = [
  {
    name: "Update",
    ref: "update",
    icon: "fas fa-pen",
    action: "submenu",
    submenu: [
      {
        name: "Workflow",
        ref: "update",
        icon: "fas fa-envelope-open",
        action: "popup",
      },
      {
        name: "Reject",
        ref: "update",
        icon: "fas fa-times",
        action: "popup",
      },
      // {
      //   name: "Fix Invoice",
      //   ref: "update",
      //   icon: "fas fa-download",
      //   action: "popup",
      // },
      // {
      //   name: "Approve Payments",
      //   ref: "update",
      //   icon: "fas fa-download",
      //   action: "popup",
      // },
    ],
  },

  {
    name: "Comming Soon",
    ref: "Comming Soon",
    icon: "fas fa-eye",
    action: "popup",
  },
  {
    name: "Comming Soon",
    ref: "Comming Soon",
    icon: "fas fa-eye",
    action: "popup",
  },
  // {
  //   name: "Export",
  //   ref: "export",
  //   icon: "fas fa-download",
  //   action: "popup",
  // },
  {
    name: "Support",
    ref: "support",
    icon: "fas fa-headset",
    action: "popup",
  },
  {
    name: "Controls",
    ref: "controls",
    icon: "fa fa-wrench",
    action: "submenu",
    submenu: [
      {
        name: "Stop",
        ref: "controls",
        icon: "fa fa-stop",
        action: "popup",
      },
      {
        name: "Proceed",
        ref: "controls",
        icon: "fa fa-play",
        action: "popup",
      },
      // {
      //   name: "Override",
      //   ref: "controls",
      //   icon: "fas fa-fast-forward",
      //   action: "popup",
      // },
      {
        name: "Approve",
        ref: "controls",
        icon: "fas fa-thumbs-up",
        action: "popup",
      },
    ],
  },
];

const SpeedDialReconcilation = (props) => {
  const { viewpo, viewgr } = props;

  const dispatch = useDispatch();
  const AC = bindActionCreators(
    {
      apReconcilationPost,
      apReconcilationPostProcess,
      apReconcilationPostStop,
      apReconcilationPostApprove,
      resetApReconcilationPost,
      apReconcilationPostOverride,
      exportAp,
    },
    dispatch
  );

  const { apReconcilation, apLoading, apError } = useSelector((state) => state.ap);
  const { apInvoiceReconcilation, emailWorkflow, emailReject } = useSelector((state) => state.table);
  const { user } = useSelector((state) => state.auth);

  const history = useHistory();
  const [popup, setpopup] = useState(null);
  const [error, seterror] = useState({
    for: null,
    message: "",
  });

  useEffect(() => {
    AC.resetApReconcilationPost();
  }, [popup]);

  function displayPopup(item) {
    if (!apLoading) {
      AC.resetApReconcilationPost();
      if (item.action === "popup") {
        setpopup(item);
        if (item.name === "View TMS") {
          AC.apReconcilationPost({
            invoiceId: apInvoiceReconcilation.invoiceId,
            fileUrl: apInvoiceReconcilation.pdf,
            message: "",
            user: user.username ? user.username : user.email,
            status: "viewPO",
          });
        }

        if (item.name === "Export") {
          AC.exportAp(apInvoiceReconcilation.invoiceId);
        }
      }
      if (item.action === "navigate") {
        history.push(item.path);
      }
    }
  }

  const [escalate, setescalate] = useState("");
  const [popupEscalate, setpopupEscalate] = useState(false);
  const [reject, setreject] = useState("");
  const [popupReject, setpopupReject] = useState(false);
  const [popupSupport, setpopupSupport] = useState(false);
  const [emailEsc, setemailEsc] = useState("");
  const [subEsc, setsubEsc] = useState("");
  const [emailRej, setemailRej] = useState("");
  const [subRej, setsubRej] = useState("");
  const [emailSupp, setemailSupp] = useState("");
  const [subSupp, setsubSupp] = useState("");
  const [support, setsupport] = useState("");

  function onClosePopup() {
    setpopup(null);
    setpopupEscalate(false);
    setpopupReject(false);
    setpopupSupport(false);
    setemailEsc("");
    setsubEsc("");
    setescalate("");
    setemailRej("");
    setsubRej("");
    setreject("");
  }

  function onSubmitEscalate() {
    AC.apReconcilationPost({
      invoiceId: apInvoiceReconcilation.invoiceId,
      fileUrl: apInvoiceReconcilation.pdf,
      message: escalate,
      user: user.username ? user.username : user.email,
      to: emailEsc,
      subject: subEsc,
      note: escalate,
      status: "Workflow",
    });
  }

  function onSubmitReject() {
    AC.apReconcilationPost({
      invoiceId: apInvoiceReconcilation.invoiceId,
      fileUrl: apInvoiceReconcilation.pdf,
      message: reject,
      user: user.username ? user.username : user.email,
      to: emailRej,
      subject: subRej,
      note: reject,
      status: "Reject",
    });
  }

  function onSubmitApprove() {
    AC.apReconcilationPostApprove({
      invoiceId: apInvoiceReconcilation.invoiceId,
      fileUrl: apInvoiceReconcilation.pdf,
      message: "",
      user: user.username ? user.username : user.email,
      status: "Payment",
    });
  }

  // function onSubmitFix() {
  //   AC.apReconcilationPost({
  //     invoiceId: apInvoiceReconcilation.invoiceId,
  //     fileUrl: apInvoiceReconcilation.pdf,
  //     message: "",
  //     user: user.username,
  //     status: "Fix",
  //   });
  // }

  function onSubmitStop() {
    AC.apReconcilationPostStop({
      invoiceId: apInvoiceReconcilation.invoiceId,
      fileUrl: apInvoiceReconcilation.pdf,
      message: "",
      user: user.username ? user.username : user.email,
      status: "Stop",
    });
  }

  function onSubmitProceed() {
    AC.apReconcilationPostProcess({
      invoiceId: apInvoiceReconcilation.invoiceId,
      fileUrl: apInvoiceReconcilation.pdf,
      message: "",
      user: user.username ? user.username : user.email,
      status: "Proceed",
    });
  }

  function onSubmitOverride() {
    AC.apReconcilationPostOverride({
      invoiceId: apInvoiceReconcilation.invoiceId,
      fileUrl: apInvoiceReconcilation.pdf,
      message: "",
      user: user.username ? user.username : user.email,
      status: "Override",
    });
  }

  function onSubmitSupport() {
    AC.apReconcilationPost({
      invoiceId: apInvoiceReconcilation.invoiceId,
      fileUrl: apInvoiceReconcilation.pdf,
      message: support,
      user: user.username ? user.username : user.email,
      to: emailSupp,
      subject: subSupp,
      note: support,
      status: "Support",
    });
  }

  function clearError() {
    seterror({
      for: null,
      message: "",
    });
  }

  return (
    <div className="speed-dial-reconcilation">
      <SpeedDialSecondary data={speedDialData} onClick={displayPopup} active={popup} onClose={onClosePopup} />
      {popup && popup.name === "Workflow" && (
        <PopupPrimary customClass="escalate-popup-primary" onClose={onClosePopup}>
          {!popupEscalate ? (
            <>
              <p className="email">Send a workflow request</p>
              <InputList
                label="E-mail to"
                name="emailto"
                options={emailWorkflow.emails}
                value={emailEsc}
                onChange={(e) => {
                  clearError();
                  setemailEsc(e.target.value);
                }}
                onClickList={(item) => setemailEsc(item)}
                error={error.for === "emailEsc" ? error.message : ""}
              />
              <InputList
                label="Subject"
                name="subject"
                options={emailWorkflow.subjects}
                value={subEsc}
                onChange={(e) => setsubEsc(e.target.value)}
                onClickList={(item) => setsubEsc(item)}
                className="mb-3"
              />
              <TextArea
                rows={6}
                label="Please specify the reason to send request."
                value={escalate}
                placeholder={error.for === "escalate" ? error.message : "E-mail Body goes here..."}
                onChange={(e) => {
                  clearError();
                  setescalate(e.target.value);
                }}
                error={error.for === "escalate" ? error.message : ""}
              />
              <div className="btn-container">
                <ButtonSecondaryFill
                  iconLeft="fas fa-paper-plane"
                  text="Send"
                  onClick={() => {
                    if (!emailValidation(emailEsc)) {
                      seterror({
                        for: "emailEsc",
                        message: "Please enter a valid e-mail",
                      });
                    } else if (!notEmptyValidation(escalate)) {
                      seterror({
                        for: "escalate",
                        message: "E-mail body must be there",
                      });
                    } else {
                      setpopupEscalate(true);
                    }
                  }}
                />
              </div>
            </>
          ) : apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Sending request ...</p>
            </div>
          ) : apError ? (
            <div className="fail">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="text">
                <p>{apError}</p>
              </div>
            </div>
          ) : apReconcilation ? (
            <div className="success">
              <div className="check">
                <i className="fas fa-check"></i>
              </div>
              <div className="feedback">
                <p>{apReconcilation.message}</p>
              </div>
            </div>
          ) : (
            <div className="popup-escalate">
              <p>Are you sure you want to send this request? You can not revert back.</p>
              <div>
                <button onClick={onSubmitEscalate}>Ok</button>
                <button onClick={() => setpopupEscalate(false)}>Cancel</button>
              </div>
            </div>
          )}
        </PopupPrimary>
      )}

      {popup && popup.name === "Reject" && (
        <PopupPrimary customClass="reject-popup-primary" onClose={onClosePopup}>
          {!popupReject ? (
            <>
              <p className="email">Send invoice back to the supplier</p>
              <InputList
                label="E-mail to"
                name="emailto"
                options={emailReject.emails}
                value={emailRej}
                onChange={(e) => {
                  clearError();
                  setemailRej(e.target.value);
                }}
                onClickList={(item) => setemailRej(item)}
                error={error.for === "emailRej" ? error.message : ""}
              />
              <InputList
                label="Subject"
                name="subject"
                options={emailReject.subjects}
                value={subRej}
                onChange={(e) => setsubRej(e.target.value)}
                onClickList={(item) => setsubRej(item)}
                className="mb-3"
              />
              <TextArea
                rows={6}
                label="Please specify the reason for rejection."
                value={reject}
                placeholder={error.for === "reject" ? error.message : "E-mail Body goes here..."}
                onChange={(e) => {
                  clearError();
                  setreject(e.target.value);
                }}
                error={error.for === "reject" ? error.message : ""}
              />
              <div className="btn-container">
                <ButtonSecondaryFill
                  text="Submit"
                  iconLeft="fas fa-paper-plane"
                  onClick={() => {
                    if (!emailValidation(emailRej)) {
                      seterror({
                        for: "emailRej",
                        message: "Please enter a valid e-mail",
                      });
                    } else if (!notEmptyValidation(reject)) {
                      seterror({
                        for: "reject",
                        message: "E-mail body must be there",
                      });
                    } else {
                      setpopupReject(true);
                    }
                  }}
                />
              </div>
            </>
          ) : apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Rejecting ...</p>
            </div>
          ) : apError ? (
            <div className="fail">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="text">
                <p>{apError}</p>
              </div>
            </div>
          ) : apReconcilation ? (
            <div className="success">
              <div className="check">
                <i className="fas fa-check"></i>
              </div>
              <div className="feedback">
                <p>{apReconcilation.message}</p>
              </div>
            </div>
          ) : (
            <div className="popup-reject">
              <p>Are you sure you want to Reject? You can not revert back.</p>
              <div>
                <button onClick={onSubmitReject}>Ok</button>
                <button onClick={() => setpopupReject(false)}>Cancel</button>
              </div>
            </div>
          )}
        </PopupPrimary>
      )}

      {popup && popup.name === "Approve" && (
        <PopupPrimary customClass="approve-popup-primary" onClose={onClosePopup}>
          {apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Approving ...</p>
            </div>
          ) : apError ? (
            <div className="fail">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="text">
                <p>{apError}</p>
              </div>
            </div>
          ) : apReconcilation ? (
            <div className="success">
              <div className="check">
                <i className="fas fa-check"></i>
              </div>
              <div className="feedback">
                <p>{apReconcilation.message}</p>
              </div>
            </div>
          ) : (
            <div className="popup-approve">
              <p>Are you sure you want to approve this invoice for payment?</p>
              <div>
                <button onClick={onSubmitApprove}>Yes</button>
                <button onClick={onClosePopup}>No</button>
              </div>
            </div>
          )}
        </PopupPrimary>
      )}
      {/* 
      {popup && popup.name === "Fix Invoice" && (
        <PopupPrimary customClass="fix-popup-primary" onClose={onClosePopup}>
          {apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Fixing ...</p>
            </div>
          ) : apError ? (
            <div className="fail">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="text">
                <p>{apError}</p>
              </div>
            </div>
          ) : apReconcilation ? (
            <div className="success">
              <div className="check">
                <i className="fas fa-check"></i>
              </div>
              <div className="feedback">
                <p>{apReconcilation.message}</p>
              </div>
            </div>
          ) : (
            <div className="popup-fix">
              <p>Are you sure you want to Fix Invoice?</p>
              <div>
                <button onClick={onSubmitFix}>Yes</button>
                <button onClick={onClosePopup}>No</button>
              </div>
            </div>
          )}
        </PopupPrimary>
      )} */}

      {/* {popup &&
        popup.name === "Comming Soon" && 
        (apLoading ? (
          <div className="view-po-loader">
            <LoaderSecondary />
            <ButtonIcon icon="fas fa-times" customClass="view-po-close" onClick={onClosePopup} />
          </div>
        ) : (
          <>
            <ViewPoTable tableTitle="Comming Soon" data={apReconcilation.viewPoTable} onClosePopup={onClosePopup} />
            <ButtonIcon icon="fas fa-times" customClass="view-po-close" onClick={onClosePopup} />
          </>
        ))} */}

      {popup && popup.name === "Comming Soon" && (
        <ViewPoTable tableTitle="Comming Soon" data={viewpo} onClosePopup={onClosePopup} />
      )}

      {popup && popup.name === "Comming Soon" && (
        <ViewPoTable tableTitle="Comming Soon" data={viewgr} onClosePopup={onClosePopup} />
      )}

      {/* {popup && popup.name === "Export" && (
        <PopupPrimary customClass="export-popup-primary" onClose={onClosePopup}>
          {apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Exporting ...</p>
            </div>
          ) : apError ? (
            <div className="fail">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="text">
                <p>{apError}</p>
              </div>
            </div>
          ) : (
            <div className="popup-export">
              <p>You have successfully exported the invoice. Would you like to open the file?</p>
              <div>
                <button
                  onClick={() => {
                    window.open(apReconcilation.pdf, "_blank");
                    onClosePopup();
                  }}
                >
                  Yes
                </button>
                <button onClick={onClosePopup}>No</button>
              </div>
            </div>
          )}
        </PopupPrimary>
      )} */}

      {popup && popup.name === "Support" && (
        <PopupPrimary customClass="reject-popup-primary" onClose={onClosePopup}>
          {!popupSupport ? (
            <>
              <p className="email">Send support e-mail</p>
              <InputList
                label="E-mail to"
                name="emailto"
                options={["email1@test.com", "email2@test.com", "email3@test.com"]}
                value={emailSupp}
                onChange={(e) => {
                  clearError();
                  setemailSupp(e.target.value);
                }}
                onClickList={(item) => setemailSupp(item)}
                error={error.for === "emailSupp" ? error.message : ""}
              />
              <InputList
                label="Subject"
                name="subject"
                options={["sub1", "sub2", "sub3"]}
                value={subSupp}
                onChange={(e) => setsubSupp(e.target.value)}
                onClickList={(item) => setsubSupp(item)}
                className="mb-3"
              />
              <TextArea
                rows={6}
                label="Please specify the reason for rejection."
                value={support}
                placeholder={error.for === "reject" ? error.message : "E-mail Body goes here..."}
                onChange={(e) => {
                  clearError();
                  setsupport(e.target.value);
                }}
                error={error.for === "support" ? error.message : ""}
              />
              <div className="btn-container">
                <ButtonSecondaryFill
                  text="Submit"
                  iconLeft="fas fa-paper-plane"
                  onClick={() => {
                    if (!emailValidation(emailSupp)) {
                      seterror({
                        for: "emailSupp",
                        message: "Please enter a valid e-mail",
                      });
                    } else if (!notEmptyValidation(support)) {
                      seterror({
                        for: "support",
                        message: "E-mail body must be there",
                      });
                    } else {
                      setpopupSupport(true);
                    }
                  }}
                />
              </div>
            </>
          ) : apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Sending ...</p>
            </div>
          ) : apError ? (
            <div className="fail">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="text">
                <p>{apError}</p>
              </div>
            </div>
          ) : apReconcilation ? (
            <div className="success">
              <div className="check">
                <i className="fas fa-check"></i>
              </div>
              <div className="feedback">
                <p>{apReconcilation.message}</p>
              </div>
            </div>
          ) : (
            <div className="popup-reject">
              <p>Are you sure you want to contact Support?</p>
              <div>
                <button onClick={onSubmitSupport}>Ok</button>
                <button onClick={() => setpopupSupport(false)}>Cancel</button>
              </div>
            </div>
          )}
        </PopupPrimary>
      )}

      {popup && popup.name === "Stop" && (
        <PopupPrimary customClass="fix-popup-primary" onClose={onClosePopup}>
          {apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Stopping...</p>
            </div>
          ) : apError ? (
            <div className="fail">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="text">
                <p>{apError}</p>
              </div>
            </div>
          ) : apReconcilation ? (
            <div className="success">
              <div className="check">
                <i className="fas fa-check"></i>
              </div>
              <div className="feedback">
                <p>{apReconcilation.message}</p>
              </div>
            </div>
          ) : (
            <div className="popup-fix">
              <p>Are you sure you want to Stop Invoice?</p>
              <div>
                <button onClick={onSubmitStop}>Yes</button>
                <button onClick={onClosePopup}>No</button>
              </div>
            </div>
          )}
        </PopupPrimary>
      )}

      {popup && popup.name === "Proceed" && (
        <PopupPrimary customClass="fix-popup-primary" onClose={onClosePopup}>
          {apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Proceed...</p>
            </div>
          ) : apError ? (
            <div className="fail">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="text">
                <p>{apError}</p>
              </div>
            </div>
          ) : apReconcilation ? (
            <div className="success">
              <div className="check">
                <i className="fas fa-check"></i>
              </div>
              <div className="feedback">
                <p>{apReconcilation.message}</p>
              </div>
            </div>
          ) : (
            <div className="popup-fix">
              <p>Are you sure you want to re-process this invoice?</p>
              <div>
                <button onClick={onSubmitProceed}>Yes</button>
                <button onClick={onClosePopup}>No</button>
              </div>
            </div>
          )}
        </PopupPrimary>
      )}

      {popup && popup.name === "Override" && (
        <PopupPrimary customClass="fix-popup-primary" onClose={onClosePopup}>
          {apLoading ? (
            <div className="spinner">
              <LoaderSecondary />
              <p>Overriding...</p>
            </div>
          ) : apError ? (
            <div className="fail">
              <div className="times">
                <i className="fas fa-times"></i>
              </div>
              <div className="text">
                <p>{apError}</p>
              </div>
            </div>
          ) : apReconcilation ? (
            <div className="success">
              <div className="check">
                <i className="fas fa-check"></i>
              </div>
              <div className="feedback">
                <p>{apReconcilation.message}</p>
              </div>
            </div>
          ) : (
            <div className="popup-fix">
              <p>Are you sure you want to Override Invoice?</p>
              <div>
                <button onClick={onSubmitOverride}>Yes</button>
                <button onClick={onClosePopup}>No</button>
              </div>
            </div>
          )}
        </PopupPrimary>
      )}
    </div>
  );
};

SpeedDialReconcilation.propTypes = {
  viewpo: PropTypes.object,
  viewgr: PropTypes.object,
};

export default SpeedDialReconcilation;
