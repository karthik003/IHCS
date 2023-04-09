import React, { useEffect, useState } from "react";
import { getApInvoiceReconcilation, setTableLoading } from "../../redux/actions/table";
import { useDispatch, useSelector } from "react-redux";

import EditInvoiceDetails from "./EditInvoiceDetails";
import LoaderPrimary from "../../layout/Loader/LoaderPrimary";
import PdfViewPrimary from "../../components/pdf-view/PdfViewPrimary";
import SpeedDialReconcilation from "./SpeedDialReconcilation";
import SteppersPrimary from "../../components/steppers/SteppersPrimary";
import SummaryTable from "./SummaryTable";
import TableParent from "./TableParent";
import Tablesecondary from "../../components/table/TableSecondary";
import { bindActionCreators } from "redux";
import { useParams } from "react-router-dom";

const InvoiceReconcilation = () => {
  const { invoiceId } = useParams();
  const dispatch = useDispatch();
  const AC = bindActionCreators({ getApInvoiceReconcilation, setTableLoading }, dispatch);
  const { apInvoiceReconcilation, tableLoading } = useSelector((state) => state.table);
  const [editInvoiceVisible, seteditInvoiceVisible] = useState(false);

  useEffect(() => {
    AC.getApInvoiceReconcilation(invoiceId);
    return () => {
      AC.setTableLoading(true);
    };
  }, []);

  console.log(apInvoiceReconcilation);

  if (apInvoiceReconcilation === null || tableLoading) {
    return <LoaderPrimary />;
  }

  return (
    <div className="invoice-reconcilation">
      <PdfViewPrimary customClass="mb-5" pdf={apInvoiceReconcilation.pdf} />
      <SteppersPrimary data={apInvoiceReconcilation.steppers} />
      <Tablesecondary
        data={apInvoiceReconcilation.invoiceDetails}
        seteditInvoiceVisible={seteditInvoiceVisible}
        customClass="mb-5"
      />
      <EditInvoiceDetails
        isVisible={editInvoiceVisible}
        setVisible={seteditInvoiceVisible}
        pdf={apInvoiceReconcilation.pdf}
        data={apInvoiceReconcilation.invoiceDetails}
        invoiceId={apInvoiceReconcilation.invoiceId}
      />
      <SummaryTable 
        customClass="mb-5"
        isVisible={editInvoiceVisible}
        // setVisible={seteditInvoiceVisible}
        // pdf={apInvoiceReconcilation.pdf}
        // data={apInvoiceReconcilation.invoiceDetails}
        // invoiceId={apInvoiceReconcilation.invoiceId}
      />
      <TableParent
        data={apInvoiceReconcilation.listOfItems}
        pdf={apInvoiceReconcilation.pdf}
        invoiceId={apInvoiceReconcilation.invoiceId}
        viewpo={apInvoiceReconcilation.viewpo}
        viewgr={apInvoiceReconcilation.viewgr}
      />
      <SpeedDialReconcilation viewpo={apInvoiceReconcilation.viewpo} viewgr={apInvoiceReconcilation.viewgr} />
    </div>
  );
};

export default InvoiceReconcilation;
