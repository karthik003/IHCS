import React, { useState } from "react";
import Chart from "react-google-charts";
import LoaderSecondary from "../../../layout/Loader/LoaderSecondary";
import MenuPrimary from "../../menu/MenuPrimary";

const AreaChart = () => {
  const [selected, setselected] = useState(null);
  return (
    <div className={`chart-container area-chart ${selected === "Full Screen" ? "full-screen" : ""}`}>
      <div className="header">
        <h3>Area Chart</h3>
        <MenuPrimary setselected={setselected} />
      </div>
      <div className="bg-dark" onClick={() => setselected(null)} />

      <Chart
        className="chart"
        chartType="AreaChart"
        loader={
          <div className="loader-container">
            <LoaderSecondary />
          </div>
        }
        data={[
          ["Year", "Sales", "Expenses"],
          ["2013", 1000, 400],
          ["2014", 1170, 460],
          ["2015", 660, 1120],
          ["2016", 1030, 540],
        ]}
        options={{
          title: "Company Performance",
          hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
          vAxis: { minValue: 0 },
          // For the legend to fit, we make the chart area smaller
          chartArea: { width: "50%", height: "70%" },
          // lineWidth: 25
        }}
        // For tests
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default AreaChart;
