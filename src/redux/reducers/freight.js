import {
  FREIGHT_ERROR,
  FREIGHT_LOADING,
  FREIGHT_RECONCILATION,
  FREIGHT_RETRIEVE,
  FREIGHT_SHAREPOINT,
  FREIGHT_UPLOAD,
} from "../types/freight";

const initialState = {
  freightUpload: "",
  freightRetrieve: "",
  freightSharePoint: "",
  freightLoading: false,
  freightError: "",
  freightReconcilation: "",
};

const freightReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FREIGHT_UPLOAD:
      return { ...state, freightUpload: payload, freightError: "" };
    case FREIGHT_RETRIEVE:
      return { ...state, freightRetrieve: payload, freightError: "" };
    case FREIGHT_SHAREPOINT:
      return { ...state, freightSharePoint: payload, freightError: "" };
    case FREIGHT_LOADING:
      return { ...state, freightLoading: payload };
    case FREIGHT_ERROR:
      return { ...state, freightError: payload };
    case FREIGHT_RECONCILATION:
      return { ...state, freightReconcilation: payload, freightError: "" };
    default:
      return state;
  }
};

export default freightReducer;
