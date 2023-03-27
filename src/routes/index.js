import React, { useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "./history";
// import InvoiceProcessing from "../pages/InvoiceProcessing";
import SidebarOpen from "../layout/Sidebar/SidebarOpen";
import Navbar from "../layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getLoginStatus } from "../redux/actions/auth";
import Sidebar from "../layout/Sidebar/Sidebar";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Settings from "../layout/Settings";
import Profile from "../layout/Profile";
import LoaderTertiary from "../layout/Loader/LoaderTertiary";
import Reconcile from "../pages/Reconcile";
import InvoiceReconcilation from "../pages/InvoiceReconcilation";
import Dashboard from "../pages/Dashboard";
import Search from "../pages/Search";

const Routes = () => {
  const dispatch = useDispatch();
  const AC = bindActionCreators({ getLoginStatus }, dispatch);
  const { isAuthenticated, initialUserLoading } = useSelector((state) => state.auth);
  const { sidebarActive } = useSelector((state) => state.styles);

  useEffect(() => {
    AC.getLoginStatus(history);
  }, []);

  if (initialUserLoading) {
    return <LoaderTertiary />;
  }

  if (!isAuthenticated) {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    );
  }
  return (
    <Router history={history}>
      <Sidebar />
      <SidebarOpen />
      <Settings />
      <Profile />
      <div className={`main ${sidebarActive ? "sidebar-active" : ""}`}>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/reconcile/:tableRef/:tableRef2">
            <Reconcile />
          </Route>
          <Route exact path="/reconciliation/:tableRef/:invoiceId">
            <InvoiceReconcilation />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          {/* <Route exact path="/ibb">
            <ComingSoon />
          </Route>
          <Route exact path="/videos">
            <ComingSoon />
          </Route>
          <Route exact path="/upload">
            <ComingSoon />
          </Route>
          <Route exact path="/retrieve">
            <ComingSoon />
          </Route>
          <Route exact path="/export">
            <ComingSoon />
          </Route> */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
