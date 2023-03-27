import { AP_IFRAME, IFRAME_LOADING, INVOICE_IFRAME } from "../types/iframe";
import axios from "axios";
import { setLastUpdated } from "./timer";

export const getApIframe = () => async (dispatch) => {
  try {
    const apIframe = await axios.get(process.env.REACT_APP_AP_DASHBOARD_IFRAME);

    dispatch({ type: AP_IFRAME, payload: apIframe.data });
    dispatch(setLastUpdated());
  } catch (error) {
    console.log(error);
  }
};

export const getInvoiceIframe = () => async (dispatch, getState) => {
  try {
    const invoiceIframe = await axios.get(
      "https://ncemibu7sg.execute-api.ap-southeast-2.amazonaws.com/dev/provenioai-invoices-dashboard",
      {
        params: {
          userEmail: getState().auth.user.username ? getState().auth.user.username : getState().auth.user.email,
        },
      }
    );

    dispatch({ type: INVOICE_IFRAME, payload: invoiceIframe.data });
    dispatch(setLastUpdated());
  } catch (error) {
    console.log(error);
  }
};

export const setIframeLoading = (isLoading) => async (dispatch) => {
  dispatch({ type: IFRAME_LOADING, payload: isLoading });
};
