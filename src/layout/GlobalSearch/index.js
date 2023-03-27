import React, { useState } from "react";
import data from "./data";

const GlobalSearch = () => {
  const [search, setsearch] = useState("");

  return (
    <div className="global-search hd-mb">
      <input type="text" placeholder="search" value={search} onChange={(e) => setsearch(e.target.value)} />

      <i className="fas fa-search"></i>
      {search && (
        <div className="list">
          {data.map((item, index) => (
            <div key={index} className="item">
              <i className="fas fa-check"></i>
              <div className="text">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
