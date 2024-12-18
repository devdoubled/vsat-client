import classNames from "classnames/bind";
import { useState } from "react";
import Chart from "react-apexcharts";
import styles from "./DashboardLineChart.module.scss";
const cx = classNames.bind(styles);

function DashboardLineChart({ data }) {
  const [chartData] = useState({
    series: data,
    options: {
      chart: {
        type: "bar",
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: ["Learning Materials", "Questions", "Exams"],
      },
      yaxis: {
        labels: {
          formatter: (val) => `${val}%`,
        },
      },
      colors: ["#2446b6", "#f4cf39", "#d7354f"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
      grid: {
        borderColor: "#e0e0e0",
      },
    },
  });
  return (
    <div className={cx("chart-container")}>
      <div className={cx("chart-title")}>Overview Statistics</div>
      <div className={cx("chart-content")}>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={415}
        />
      </div>
    </div>
  )
}

export default DashboardLineChart
