import React, { useEffect } from "react";
import CounterPrimary from "../../components/counters/CounterPrimary";
import { getApReconcileTable, setTableLoading } from "../../redux/actions/table";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import LoaderPrimary from "../../layout/Loader/LoaderPrimary";
import { useParams, useHistory } from "react-router-dom";
import TableReconcile from "./TableReconcile";

const Reconcile = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const AC = bindActionCreators({ getApReconcileTable, setTableLoading }, dispatch);
  const { apReconcileTable, tableLoading } = useSelector((state) => state.table);

  useEffect(() => {
    AC.getApReconcileTable(params.tableRef, params.tableRef2);
    return () => {
      AC.setTableLoading(true);
    };
  }, [params.tableRef, params.tableRef2]);

  if (apReconcileTable === null || tableLoading) {
    return <LoaderPrimary />;
  }

  return (
    <div className="reconcile">
      <div className="counter-container">
        {apReconcileTable.Counter.map((counter) => (
          <CounterPrimary
            customClass={params.tableRef2 === counter.tableRef ? "active-counter" : ""}
            key={counter.id}
            data={counter}
            onClick={() => history.push(`/reconcile/${params.tableRef}/${counter.tableRef}`)}
          />
        ))}
      </div>
      <TableReconcile data={apReconcileTable.Table} tableTitle={apReconcileTable.Table.tableTitle} />
    </div>
  );
};

export default Reconcile;
