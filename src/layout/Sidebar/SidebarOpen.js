import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ddLogo from "../../media/images/bg2.png";

const SidebarOpen = () => {
  const { pathname } = useLocation();
  const { sidebarActive } = useSelector((state) => state.styles);
  const { counters } = useSelector((state) => state.table);

  return (
    <div className={`sidebar-open hd-mb ${sidebarActive ? "sidebar-active" : ""}`}>
      <div className="logo">
        <Link to="/">
          <img src={ddLogo} alt="proventio logo" />
        </Link>
      </div>

      <h2>Patient Information</h2>
      <div className="menu">
        <div className="section">
          <Link to={`/dashboard`} className={`tabs ${pathname.includes(`/dashboard`) ? "tab-active" : ""}`}>
            <div className="icon">
              <i className="fas fa-chart-bar"></i>
            </div>
            <p>Dashboard</p>
          </Link>
          <Link to={`/search`} className={`tabs ${pathname.includes(`/search`) ? "tab-active" : ""}`}>
            <div className="icon">
              <i className="fas fa-search"></i>
            </div>
            <p>Search</p>
          </Link>

          {counters &&
            counters.map((item) => (
              <Link
                key={item.id}
                to={`/reconcile/${item.tableRef}/all`}
                className={`tabs ${pathname.includes(`/${item.tableRef}`) ? "tab-active" : ""}`}
              >
                <div className="icon">
                  <i className={item.icon}></i>
                </div>
                <p>{item.name}</p>
                <div className="counter">{item.value}</div>
              </Link>
            ))}
        </div>

        {/* <div className="section">
          <h2>Digital Worker Library</h2>
          <Link to="/ibb" className={`tabs ${pathname === "/ibb" ? "tab-active" : ""}`}>
            <div className="icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <p>Intelligent Business Blocks</p>
          </Link>
          <Link to="/videos" className={`tabs ${pathname === "/videos" ? "tab-active" : ""}`}>
            <div className="icon">
              <i className="fas fa-play-circle"></i>
            </div>
            <p>Use Case Videos</p>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default SidebarOpen;
