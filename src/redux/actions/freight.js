import axios from "axios";
import {
  FREIGHT_ERROR,
  FREIGHT_LOADING,
  FREIGHT_RECONCILATION,
  FREIGHT_RETRIEVE,
  FREIGHT_SHAREPOINT,
  FREIGHT_UPLOAD,
} from "../types/freight";

// Freight

export const resetFreightUpload = () => (dispatch) => {
  dispatch({ type: FREIGHT_UPLOAD, payload: "" });
};

export const freightFileUpload = (files) => async (dispatch) => {
  const filesArray = Array.from(files);

  dispatch(setFreightLoading(true));

  try {
    const filePromises = filesArray.map(async (file) => {
      const fileRes = await axios.get(
        "https://ncemibu7sg.execute-api.ap-southeast-2.amazonaws.com/dev/provenioai-invoices-input",
        {
          params: {
            module: "freight",
            type: "upload",
            filename: file.name,
          },
        }
      );
      const res = fileRes.data;

      var formdata = new FormData();
      formdata.append("key", res["Presigned_Url"]["fields"]["key"]);
      formdata.append("AWSAccessKeyId", res["Presigned_Url"]["fields"]["AWSAccessKeyId"]);
      formdata.append("policy", res["Presigned_Url"]["fields"]["policy"]);
      formdata.append("signature", res["Presigned_Url"]["fields"]["signature"]);
      // formdata.append("x-amz-security-token", res["Presigned_Url"]["fields"]["x-amz-security-token"]);
      formdata.append("bucket", "preproduction-provenioai-patties-invoices-freight");
      formdata.append("file", file);

      await axios.post("https://preproduction-provenioai-patties-invoices-freight.s3.amazonaws.com/", formdata);
    });

    await Promise.all(filePromises);
    dispatch({ type: FREIGHT_UPLOAD, payload: "success" });

    dispatch(setFreightLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: FREIGHT_ERROR, payload: "Error uploading the file" });
    dispatch(setFreightLoading(false));
  }
};

export const getFreightRetrieve = () => async (dispatch) => {
  dispatch(setFreightLoading(true));
  try {
    const apRetrieve = await axios.get(
      "https://ncemibu7sg.execute-api.ap-southeast-2.amazonaws.com/dev/provenioai-invoices-input?module=ap&type=email"
    );
    dispatch({ type: FREIGHT_RETRIEVE, payload: apRetrieve.data });
    dispatch(setFreightLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: FREIGHT_ERROR, payload: "Error fetching the data" });
    dispatch(setFreightLoading(false));
  }
};

export const getFreightSharePoint = () => async (dispatch) => {
  dispatch(setFreightLoading(true));
  try {
    const apSharePoint = await axios.get(
      "https://ncemibu7sg.execute-api.ap-southeast-2.amazonaws.com/dev/provenioai-invoices-input?module=ap&type=sharepoint"
    );
    dispatch({ type: FREIGHT_SHAREPOINT, payload: apSharePoint.data });
    dispatch(setFreightLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: FREIGHT_ERROR, payload: "Error fetching the data" });
    dispatch(setFreightLoading(false));
  }
};

export const exportRangeFreight = (from, to) => async (dispatch) => {
  dispatch(setFreightLoading(true));
  try {
    const exportFreight = await axios.get(
      "https://ncemibu7sg.execute-api.ap-southeast-2.amazonaws.com/dev/provenioai-invoices-export",
      {
        params: {
          type: "between",
          method: "freight",
          from: `${from} 00:00:00`,
          to: `${to} 00:00:00`,
        },
      }
    );

    if (exportFreight.data.error) {
      dispatch({ type: FREIGHT_ERROR, payload: exportFreight.data.error });
    } else {
      dispatch({ type: FREIGHT_RECONCILATION, payload: exportFreight.data });
    }
    dispatch(setFreightLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: FREIGHT_ERROR, payload: "Error fetching the data" });
    dispatch(setFreightLoading(false));
  }
};

export const setFreightLoading = (isLoading) => async (dispatch) => {
  dispatch({ type: FREIGHT_LOADING, payload: isLoading });
};

// AP Invoice reconcilation

export const freightReconcilationPost = (data) => async (dispatch) => {
  const { invoiceId, fileUrl, message, user, status } = data;
  dispatch(setFreightLoading(true));
  try {
    const freightReconcile = await axios.post(
      "https://ncemibu7sg.execute-api.ap-southeast-2.amazonaws.com/dev/provenioai-invoices-update",
      {
        Invoice_ID: invoiceId,
        FileURL: fileUrl,
        Message: message ? message : "", //Text from note
        Method: "Freight", //AP or Freight
        User: user, //User name
        Status: status, // Rejected or Escalated or Payment
      }
    );
    if (freightReconcile.data.statusCode === 200) {
      dispatch({ type: FREIGHT_RECONCILATION, payload: freightReconcile.data });
    } else if (freightReconcile.data.statusCode === 500) {
      dispatch({ type: FREIGHT_ERROR, payload: freightReconcile.data.body.Message });
    } else {
      dispatch({ type: FREIGHT_RECONCILATION, payload: freightReconcile.data });
    }
    dispatch(setFreightLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: FREIGHT_ERROR, payload: "Error occured" });
    dispatch(setFreightLoading(false));
  }
};

export const exportFreight = (invoiceId) => async (dispatch) => {
  dispatch(setFreightLoading(true));
  try {
    const exportFr = await axios.get(
      "https://zbrv6vrd0d.execute-api.ap-southeast-2.amazonaws.com/default/preproduction-provenioai-patties-invoices-export",
      {
        params: {
          invoice_id: invoiceId,
          process_method: "freight",
        },
      }
    );

    dispatch({ type: FREIGHT_RECONCILATION, payload: exportFr.data });
    dispatch(setFreightLoading(false));
  } catch (error) {
    console.log(error);
    dispatch({ type: FREIGHT_ERROR, payload: "Error fetching the data" });
    dispatch(setFreightLoading(false));
  }
};

export const resetFreightReconcilationPost = () => async (dispatch) => {
  dispatch({ type: FREIGHT_RECONCILATION, payload: "" });
};
