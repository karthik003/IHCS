import {
  AP_RECONCILE_TABLE,
  AP_INVOICE_RECONCILATION,
  TABLE_LOADING,
  COUNTERS,
  ACTIVE_COUNTER,
  TABLE_SEARCH,
  EMAIL_WORKFLOW,
  EMAIL_REJECT,
} from "../types/table";

const initialState = {
  counters: null,
  activeCounter: null,
  apReconcileTable: null,
  apInvoiceReconcilation: null,
  tableLoading: true,
  lastUpdated: 0,
  tableSearch: null,
  emailWorkflow: null,
  emailReject: null,
};

const tableReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case COUNTERS:
      return { ...state, counters: payload };
    case ACTIVE_COUNTER:
      return { ...state, activeCounter: payload };
    case AP_RECONCILE_TABLE:
      return { ...state, apReconcileTable: payload, tableLoading: false };
    case AP_INVOICE_RECONCILATION:
      return { ...state, apInvoiceReconcilation: payload, tableLoading: false };
    case TABLE_SEARCH:
      return { ...state, tableSearch: payload, tableLoading: false };
    case TABLE_LOADING:
      return { ...state, tableLoading: payload };
    case EMAIL_WORKFLOW:
      return { ...state, emailWorkflow: payload };
    case EMAIL_REJECT:
      return { ...state, emailReject: payload };
    default:
      return state;
  }
};

export default tableReducer;
