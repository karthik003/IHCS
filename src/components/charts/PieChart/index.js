import React, { useState } from "react";
import Chart from "react-google-charts";
import LoaderSecondary from "../../../layout/Loader/LoaderSecondary";
import MenuPrimary from "../../menu/MenuPrimary";

const PieChart = () => {
  const [selected, setselected] = useState(null);
  return (
    <div className={`chart-container pie-chart ${selected === "Full Screen" ? "full-screen" : ""}`}>
      <div className="header">
        <h3>Pie Chart</h3>
        <MenuPrimary setselected={setselected} />
      </div>
      <div className="bg-dark" onClick={() => setselected(null)} />
      <Chart
        className="chart"
        chartType="PieChart"
        loader={
          <div className="loader-container">
            <LoaderSecondary />
          </div>
        }
        data={[
          ["Task", "Hours per Day"],
          ["Work", 11],
          ["Eat", 2],
          ["Commute", 2],
          ["Watch TV", 2],
          ["Sleep", 7],
        ]}
        options={{
          title: "My Daily Activities",
          // Just add this option
          is3D: true,
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

export default PieChart;
