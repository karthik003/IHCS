import React, { useState } from "react";
import Chart from "react-google-charts";
import LoaderSecondary from "../../../layout/Loader/LoaderSecondary";
import MenuPrimary from "../../menu/MenuPrimary";

const BarChart = () => {
  const [selected, setselected] = useState(null);
  return (
    <div className={`chart-container bar-chart ${selected === "Full Screen" ? "full-screen" : ""}`}>
      <div className="header">
        <h3>Bar Chart</h3>
        <MenuPrimary setselected={setselected} />
      </div>
      <div className="bg-dark" onClick={() => setselected(null)} />
      <Chart
        className="chart"
        chartType="BarChart"
        loader={
          <div className="loader-container">
            <LoaderSecondary />
          </div>
        }
        data={[
          ["City", "2010 Population", "2000 Population"],
          ["New York City, NY", 8175000, 8008000],
          ["Los Angeles, CA", 3792000, 3694000],
          ["Chicago, IL", 2695000, 2896000],
          ["Houston, TX", 2099000, 1953000],
          ["Philadelphia, PA", 1526000, 1517000],
        ]}
        options={{
          title: "Population of Largest U.S. Cities",
          chartArea: { width: "50%" },
          hAxis: {
            title: "Total Population",
            minValue: 0,
          },
          vAxis: {
            title: "City",
          },
        }}
        // For tests
        rootProps={{ "data-testid": "1" }}
      />
    </div>
  );
};

export default BarChart;
