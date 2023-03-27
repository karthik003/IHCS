import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import TooltipPrimary from "../../components/tooltips/TooltipPrimary";
import ddLogo from "../../media/images/bg2.png";

const Sidebar = () => {
  const { pathname } = useLocation();

  const { sidebarActive } = useSelector((state) => state.styles);
  const { counters } = useSelector((state) => state.table);

  return (
    <div className={`sidebar ${sidebarActive ? "sidebar-active" : ""}`}>
      {process.env.REACT_APP_NODE_ENV === "local" ? (
        <div className="logo hd-mb provenioqa">
          <Link to="/">
            <img src={ddLogo} alt="provenio logo" />
          </Link>
        </div>
      ) : (
        <div className="logo hd-mb">
          <Link to="/">
            <img src={ddLogo} alt="provenio logo" />
          </Link>
        </div>
      )}
      <div className="menu">
        <div className="section">
          <TooltipPrimary text="Dashboard" active={pathname.includes(`/dashboard`)} counter="">
            <Link to="/dashboard" className={`tabs ${pathname.includes(`/dashboard`) ? "tab-active" : ""}`}>
              <div className="icon">
                <i className="fas fa-chart-bar"></i>
              </div>
            </Link>
          </TooltipPrimary>
          <TooltipPrimary text="Search" active={pathname.includes(`/search`)} counter="">
            <Link to="/search" className={`tabs ${pathname.includes(`/search`) ? "tab-active" : ""}`}>
              <div className="icon">
                <i className="fas fa-search"></i>
              </div>
            </Link>
          </TooltipPrimary>

          {counters &&
            counters.map((item) => (
              <TooltipPrimary
                key={item.id}
                text={item.name}
                counter={item.value}
                active={pathname.includes(`/${item.tableRef}`)}
              >
                <Link
                  to={`/reconcile/${item.tableRef}/all`}
                  className={`tabs ${pathname.includes(`/${item.tableRef}`) ? "tab-active" : ""}`}
                >
                  <div className="icon">
                    <i className={item.icon}></i>
                  </div>
                </Link>
              </TooltipPrimary>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
