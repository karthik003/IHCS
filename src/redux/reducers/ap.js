import { AP_ERROR, AP_LOADING, AP_RECONCILATION, AP_RETRIEVE, AP_SHAREPOINT, AP_UPLOAD, AP_VIEW_PO } from "../types/ap";

const initialState = {
  apUpload: "",
  apRetrieve: "",
  apSharePoint: "",
  apLoading: false,
  apError: "",
  apReconcilation: "",
  apViewPo: null,
};

const apReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AP_UPLOAD:
      return { ...state, apUpload: payload, apError: "" };
    case AP_RETRIEVE:
      return { ...state, apRetrieve: payload, apError: "" };
    case AP_SHAREPOINT:
      return { ...state, apSharePoint: payload, apError: "" };
    case AP_LOADING:
      return { ...state, apLoading: payload };
    case AP_ERROR:
      return { ...state, apError: payload };
    case AP_RECONCILATION:
      return { ...state, apReconcilation: payload, apError: "" };
    case AP_VIEW_PO:
      return { ...state, apViewPo: payload, apError: "" };
    default:
      return state;
  }
};

export default apReducer;
