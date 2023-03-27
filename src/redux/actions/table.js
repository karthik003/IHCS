/* eslint-disable no-unused-vars */
import {
  AP_INVOICE_RECONCILATION,
  AP_RECONCILE_TABLE,
  COUNTERS,
  EMAIL_REJECT,
  EMAIL_WORKFLOW,
  TABLE_LOADING,
  TABLE_SEARCH,
} from "../types/table";
import axios from "../../apis/baseUrl";
import { setLastUpdated } from "./timer";
import { setNotificationActive } from "./styles";

export const getCounters = () => async (dispatch) => {
  try {
    const counters = await axios.get(process.env.REACT_APP_AP_COUNTERS);

    dispatch({ type: COUNTERS, payload: counters.data.Counter });
    dispatch(setLastUpdated());
  } catch (error) {
    console.log(error);
  }
};

export const refetchCounters = (tableRef) => async (dispatch) => {
  try {
    const counters = await axios.get(process.env.REACT_APP_AP_COUNTERS);

    await dispatch(getApReconcileTable(tableRef));

    dispatch({ type: COUNTERS, payload: counters.data.Counter });
    dispatch(
      setNotificationActive({
        text: "Successfully Updated",
        icon: "fas fa-check-circle",
        backgroundColor: "",
        color: "",
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export const getApReconcileTable = (tableRef, tableRef2) => async (dispatch) => {
  try {
    const apReconcileData = await axios.get(process.env.REACT_APP_AP_RECONCILE_TABLE, {
      params: {
        navigator: tableRef,
        type: tableRef2,
      },
    });

    console.log("test", apReconcileData.data);

    dispatch({ type: AP_RECONCILE_TABLE, payload: apReconcileData.data });
    dispatch(setLastUpdated());
  } catch (error) {
    console.log(error);
  }
};

export const getApInvoiceReconcilation = (invoiceId) => async (dispatch) => {
  try {
    const apInvoiceReconcilationData = await axios.get(process.env.REACT_APP_AP_RECONCILATION_TABLE, {
      params: {
        id: invoiceId,
      },
    });

    const emailWorkflow = await axios.get(process.env.REACT_APP_AP_EMAIL_WORKFLOW, {
      params: {
        action: "workflow",
      },
    });

    dispatch({ type: EMAIL_WORKFLOW, payload: emailWorkflow.data });

    const emailReject = await axios.get(process.env.REACT_APP_AP_EMAIL_REJECT, {
      params: {
        action: "reject",
        suppliercode: apInvoiceReconcilationData.data.supplierid,
      },
    });
    dispatch({ type: EMAIL_REJECT, payload: emailReject.data });

    dispatch({ type: AP_INVOICE_RECONCILATION, payload: apInvoiceReconcilationData.data });

    dispatch(setLastUpdated());
  } catch (error) {
    console.log(error);
  }
};

export const setTableLoading = (tableLoading) => async (dispatch) => {
  dispatch({ type: TABLE_LOADING, payload: tableLoading });
};

// eslint-disable-next-line no-unused-vars
export const getTableSearch = (search) => async (dispatch) => {
  dispatch(setTableLoading(true));
  try {
    const getTableSearch = await axios.get(process.env.REACT_APP_AP_TABLE_SEARCH, {
      params: {
        navigator: "globalsearch",
        type: search,
      },
    });

    dispatch({ type: TABLE_SEARCH, payload: getTableSearch.data });

    dispatch(setLastUpdated());
  } catch (error) {
    console.log(error);
  }
  dispatch(setTableLoading(false));
};
