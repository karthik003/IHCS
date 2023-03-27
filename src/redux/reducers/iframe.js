import { AP_IFRAME, IFRAME_LOADING, INVOICE_IFRAME } from "../types/iframe";

const initialState = {
  apIframe: "",
  invoiceIframe: [],
  iframeLoading: true,
};

const iframeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AP_IFRAME:
      return { ...state, apIframe: payload, iframeLoading: false };
    case INVOICE_IFRAME:
      return { ...state, invoiceIframe: payload, iframeLoading: false };
    case IFRAME_LOADING:
      return { ...state, iframeLoading: payload };
    default:
      return state;
  }
};

export default iframeReducer;
