/* eslint-disable no-unused-vars */
import { AP_ERROR, AP_LOADING, AP_RECONCILATION, AP_RETRIEVE, AP_SHAREPOINT, AP_UPLOAD } from "../types/ap";
import axios from "axios";
import { setNotificationActive } from "./styles";
import { getApInvoiceReconcilation, getCounters } from "./table";

// Ap

export const resetApUpload = () => (dispatch) => {
  dispatch({ type: AP_UPLOAD, payload: "" });
};

export const apFileUpload = (files) => async (dispatch) => {
  const filesArray = Array.from(files);

  dispatch(setApLoading(true));

  try {
    const filePromises = filesArray.map(async (file) => {
      const fileRes = await axios.get(process.env.REACT_APP_AP_FILE_UPLOAD, {
        params: {
          module: "ap",
          type: "upload",
          filename: file.name,
        },
      });
      const res = fileRes.data;

      var formdata = new FormData();
      formdata.append("key", res["Presigned_Url"]["fields"]["key"]);
      formdata.append("AWSAccessKeyId", res["Presigned_Url"]["fields"]["AWSAccessKeyId"]);
      formdata.append("policy", res["Presigned_Url"]["fields"]["policy"]);
      formdata.append("signature", res["Presigned_Url"]["fields"]["signature"]);
      // formdata.append("x-amz-security-token", res["Presigned_Url"]["fields"]["x-amz-security-token"]);
      formdata.append("bucket", process.env.REACT_APP_AP_S3_NAME);
      formdata.append("file", file);

      await axios.post(process.env.REACT_APP_AP_FILE_UPLOAD_S3, formdata);
    });

    await Promise.all(filePromises);
    dispatch({ type: AP_UPLOAD, payload: "success" });

    dispatch(setApLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: AP_ERROR, payload: "Error uploading the file" });
    dispatch(setApLoading(false));
  }
};

export const getApRetrieve = () => async (dispatch) => {
  dispatch(setApLoading(true));
  try {
    const apRetrieve = await axios.get(
      "https://ncemibu7sg.execute-api.ap-southeast-2.amazonaws.com/dev/provenioai-invoices-input?module=ap&type=email"
    );
    dispatch({ type: AP_RETRIEVE, payload: apRetrieve.data });
    dispatch(setApLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: AP_ERROR, payload: "Error fetching the data" });
    dispatch(setApLoading(false));
  }
};

export const getApSharePoint = () => async (dispatch) => {
  dispatch(setApLoading(true));
  try {
    const apSharePoint = await axios.get(
      "https://ncemibu7sg.execute-api.ap-southeast-2.amazonaws.com/dev/provenioai-invoices-input?module=ap&type=sharepoint"
    );
    dispatch({ type: AP_SHAREPOINT, payload: apSharePoint.data });
    dispatch(setApLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: AP_ERROR, payload: "Error fetching the data" });
    dispatch(setApLoading(false));
  }
};

export const exportRangeAp = (from, to) => async (dispatch) => {
  dispatch(setApLoading(true));
  try {
    const exportAp = await axios.get(
      "https://ncemibu7sg.execute-api.ap-southeast-2.amazonaws.com/dev/provenioai-invoices-export",
      {
        params: {
          type: "between",
          method: "ap",
          from: `${from} 00:00:00`,
          to: `${to} 00:00:00`,
        },
      }
    );

    if (exportAp.data.error) {
      dispatch({ type: AP_ERROR, payload: exportAp.data.error });
    } else {
      dispatch({ type: AP_RECONCILATION, payload: exportAp.data });
    }
    dispatch(setApLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: AP_ERROR, payload: "Error fetching the data" });
    dispatch(setApLoading(false));
  }
};

export const setApLoading = (isLoading) => async (dispatch) => {
  dispatch({ type: AP_LOADING, payload: isLoading });
};

// AP Invoice reconcilation

export const apReconcilationPost = (data) => async (dispatch) => {
  // eslint-disable-next-line no-unused-vars
  const { invoiceId, fileUrl, message, user, to, subject, note, status } = data;
  dispatch(setApLoading(true));
  try {
    const apReconcile = await axios.post(process.env.REACT_APP_AP_RECONCILATION_EMAIL, {
      invoice_id: invoiceId,
      // FileURL: fileUrl,
      // Message: message ? message : "", //Text from note
      // Method: "AP",
      user, //User name
      Status: status, // Rejected or Escalated or Payment
      to,
      subject,
      note,
    });

    dispatch(getCounters());
    dispatch(getApInvoiceReconcilation(invoiceId));

    if (apReconcile.data.status === "Success") {
      dispatch({ type: AP_RECONCILATION, payload: apReconcile.data });
    } else if (apReconcile.data.status === "Failed") {
      dispatch({ type: AP_ERROR, payload: apReconcile.data.message });
    } else {
      dispatch({ type: AP_RECONCILATION, payload: apReconcile.data });
    }
    dispatch(setApLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: AP_ERROR, payload: "Error occured" });
    dispatch(setApLoading(false));
  }
};

export const apReconcilationPostProcess = (data) => async (dispatch) => {
  // eslint-disable-next-line no-unused-vars
  const { invoiceId } = data;
  dispatch(setApLoading(true));
  try {
    const apReconcile = await axios.post(process.env.REACT_APP_AP_RECONCILATION_PROCESS, {
      id: invoiceId,
    });

    dispatch(getCounters());
    dispatch(getApInvoiceReconcilation(invoiceId));

    if (apReconcile.data.status === "Success") {
      dispatch({ type: AP_RECONCILATION, payload: apReconcile.data });
    } else if (apReconcile.data.status === "Failed") {
      dispatch({ type: AP_ERROR, payload: apReconcile.data.message });
    } else {
      dispatch({ type: AP_RECONCILATION, payload: apReconcile.data });
    }
    dispatch(setApLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: AP_ERROR, payload: "Error occured" });
    dispatch(setApLoading(false));
  }
};

export const apReconcilationPostOverride = (data) => async (dispatch) => {
  // eslint-disable-next-line no-unused-vars
  const { invoiceId } = data;
  dispatch(setApLoading(true));
  try {
    const apReconcile = await axios.post(process.env.REACT_APP_AP_RECONCILATION_OVERRIDE, {
      id: invoiceId,
      override: 1,
    });

    dispatch(getCounters());
    dispatch(getApInvoiceReconcilation(invoiceId));

    if (apReconcile.data.status === "Success") {
      dispatch({ type: AP_RECONCILATION, payload: apReconcile.data });
    } else if (apReconcile.data.status === "Failed") {
      dispatch({ type: AP_ERROR, payload: apReconcile.data.message });
    } else {
      dispatch({ type: AP_RECONCILATION, payload: apReconcile.data });
    }
    dispatch(setApLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: AP_ERROR, payload: "Error occured" });
    dispatch(setApLoading(false));
  }
};

export const apReconcilationPostStop = (data) => async (dispatch) => {
  // eslint-disable-next-line no-unused-vars
  const { invoiceId } = data;
  dispatch(setApLoading(true));
  try {
    const apReconcile = await axios.post(process.env.REACT_APP_AP_RECONCILATION_STOP, {
      stop_processing_id: invoiceId,
    });

    dispatch(getCounters());
    dispatch(getApInvoiceReconcilation(invoiceId));

    if (apReconcile.data.status === "Success") {
      dispatch({ type: AP_RECONCILATION, payload: apReconcile.data });
    } else if (apReconcile.data.status === "Failed") {
      dispatch({ type: AP_ERROR, payload: apReconcile.data.message });
    } else {
      dispatch({ type: AP_RECONCILATION, payload: apReconcile.data });
    }
    dispatch(setApLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: AP_ERROR, payload: "Error occured" });
    dispatch(setApLoading(false));
  }
};

export const apReconcilationPostApprove = (data) => async (dispatch) => {
  // eslint-disable-next-line no-unused-vars
  const { invoiceId } = data;
  dispatch(setApLoading(true));
  try {
    const apReconcile = await axios.post(process.env.REACT_APP_AP_RECONCILATION_APPROVE, {
      id: invoiceId,
    });

    dispatch(getCounters());
    dispatch(getApInvoiceReconcilation(invoiceId));

    if (apReconcile.data.status === "Success") {
      dispatch({ type: AP_RECONCILATION, payload: apReconcile.data });
    } else if (apReconcile.data.status === "Failed") {
      dispatch({ type: AP_ERROR, payload: apReconcile.data.message });
    } else {
      dispatch({ type: AP_RECONCILATION, payload: apReconcile.data });
    }
    dispatch(setApLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: AP_ERROR, payload: "Error occured" });
    dispatch(setApLoading(false));
  }
};

export const exportAp = (invoiceId) => async (dispatch) => {
  dispatch(setApLoading(true));
  try {
    const exportAp = await axios.get(process.env.REACT_APP_AP_EXPORT, {
      params: {
        invoice_id: invoiceId,
        process_method: "ap",
      },
    });

    dispatch(getCounters());
    dispatch(getApInvoiceReconcilation(invoiceId));

    dispatch({ type: AP_RECONCILATION, payload: exportAp.data });
    dispatch(setApLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: AP_ERROR, payload: "Error fetching the data" });
    dispatch(setApLoading(false));
  }
};

export const resetApReconcilationPost = () => async (dispatch) => {
  dispatch({ type: AP_RECONCILATION, payload: "" });
};

export const changeApInvoiceDetails = (invoiceId, body, setVisible, copyPo) => async (dispatch, getState) => {
  dispatch(setApLoading(true));
  try {
    const changeInvoiceAp = await axios.post(process.env.REACT_APP_AP_UPDATE_INVOICE, {
      Invoice_ID: invoiceId,
      User: getState().auth.user.username ? getState().auth.user.username : getState().auth.user.email,
      ...body,
      po_copy: copyPo,
      type: "invoice_details",
    });

    if (changeInvoiceAp.data.status === "Success") {
      dispatch(
        setNotificationActive({
          text: changeInvoiceAp.data.message,
          icon: "fas fa-check-circle",
          backgroundColor: "",
          color: "",
        })
      );
      dispatch(getCounters());
      dispatch(getApInvoiceReconcilation(invoiceId));
    } else {
      dispatch(
        setNotificationActive({
          text: changeInvoiceAp.data.message,
          icon: "fas fa-times-circle",
          backgroundColor: "",
          color: "",
        })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(
      setNotificationActive({
        text: "Error changing the data",
        icon: "fas fa-times-circle",
        backgroundColor: "",
        color: "",
      })
    );
  }
  dispatch(setApLoading(false));

  setTimeout(() => {
    setVisible(false);
    dispatch(setApReconcilation(null));
    dispatch(setApError(null));
  }, 2000);
};

export const changeApInvoiceDetailsTable =
  (invoiceId, lineitemid, body, setVisible, copyPo, selectedItem) => async (dispatch, getState) => {
    console.log("1", invoiceId, lineitemid, body, setVisible, copyPo, selectedItem);
    dispatch(setApLoading(true));

    const apiBody = selectedItem.length
      ? {
          Invoice_ID: invoiceId,
          LineItem_ID: lineitemid,
          User: getState().auth.user.username ? getState().auth.user.username : getState().auth.user.email,
          ...body,
          Item_SL_No: selectedItem,
          po_copy: copyPo,
          type: "lineitems",
        }
      : {
          Invoice_ID: invoiceId,
          LineItem_ID: lineitemid,
          User: getState().auth.user.username ? getState().auth.user.username : getState().auth.user.email,
          ...body,
          po_copy: copyPo,
          type: "lineitems",
        };

    console.log("2", apiBody);
    try {
      const changeInvoiceAp = await axios.post(process.env.REACT_APP_AP_UPDATE_LINEITEM, apiBody);

      if (changeInvoiceAp.data.status === "Success") {
        dispatch(
          setNotificationActive({
            text: changeInvoiceAp.data.message,
            icon: "fas fa-check-circle",
            backgroundColor: "",
            color: "",
          })
        );
        dispatch(getCounters());
        dispatch(getApInvoiceReconcilation(invoiceId));
      } else {
        dispatch(
          setNotificationActive({
            text: changeInvoiceAp.data.message,
            icon: "fas fa-times-circle",
            backgroundColor: "",
            color: "",
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setNotificationActive({
          text: "Error changing the data",
          icon: "fas fa-times-circle",
          backgroundColor: "",
          color: "",
        })
      );
    }
    dispatch(setApLoading(false));

    setTimeout(() => {
      setVisible(false);
      dispatch(setApReconcilation(null));
      dispatch(setApError(null));
    }, 2000);
  };

export const addLineItem = (invoiceId, body, setVisible, copyPo) => async (dispatch, getState) => {
  dispatch(setApLoading(true));
  try {
    const changeInvoiceAp = await axios.post(process.env.REACT_APP_AP_ADD_LINEITEM, {
      Invoice_ID: invoiceId,
      LineItem_ID: "",
      User: getState().auth.user.username ? getState().auth.user.username : getState().auth.user.email,
      ...body,
      po_copy: copyPo,
    });

    if (changeInvoiceAp.data.status === "Success") {
      dispatch(
        setNotificationActive({
          text: changeInvoiceAp.data.message,
          icon: "fas fa-check-circle",
          backgroundColor: "",
          color: "",
        })
      );
      dispatch(getCounters());
      dispatch(getApInvoiceReconcilation(invoiceId));
    } else {
      dispatch(
        setNotificationActive({
          text: changeInvoiceAp.data.message,
          icon: "fas fa-times-circle",
          backgroundColor: "",
          color: "",
        })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(
      setNotificationActive({
        text: "Error adding the data",
        icon: "fas fa-times-circle",
        backgroundColor: "",
        color: "",
      })
    );
  }
  dispatch(setApLoading(false));

  setTimeout(() => {
    setVisible(false);
    dispatch(setApReconcilation(null));
    dispatch(setApError(null));
  }, 2000);
};

export const deleteLineItem = (invoiceId, lineitemid, setVisible) => async (dispatch, getState) => {
  dispatch(setApLoading(true));
  try {
    const deleteItem = await axios.post(process.env.REACT_APP_AP_DELETE_LINEITEM, {
      Invoice_ID: invoiceId,
      LineItem_ID: lineitemid,
      User: getState().auth.user.username ? getState().auth.user.username : getState().auth.user.email,
    });

    if (deleteItem.data.status === "Success") {
      dispatch(
        setNotificationActive({
          text: deleteItem.data.message,
          icon: "fas fa-check-circle",
          backgroundColor: "",
          color: "",
        })
      );
      dispatch(getCounters());
      dispatch(getApInvoiceReconcilation(invoiceId));
    } else {
      dispatch(
        setNotificationActive({
          text: deleteItem.data.message,
          icon: "fas fa-times-circle",
          backgroundColor: "",
          color: "",
        })
      );
    }
  } catch (error) {
    console.log(error);
    dispatch(
      setNotificationActive({
        text: "Error deleting the data",
        icon: "fas fa-times-circle",
        backgroundColor: "",
        color: "",
      })
    );
  }
  dispatch(setApLoading(false));

  // setTimeout(() => {
  setVisible(null);
  // dispatch(setApReconcilation(null));
  // dispatch(setApError(null));
  // }, 2000);
};

export const setApReconcilation = (data) => async (dispatch) => {
  dispatch({ type: AP_RECONCILATION, payload: data });
};
export const setApError = (data) => async (dispatch) => {
  dispatch({ type: AP_ERROR, payload: data });
};
