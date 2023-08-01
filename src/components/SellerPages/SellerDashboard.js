import React, { Fragment, useEffect } from "react";
import carousel1 from "../../assets/carousel/1.png";
import "./SellerDashboard.css";
import Chart from "react-apexcharts";
import SellerNavbarDashboard from "./SellerNavbarDashboard";

const Dashboard = () => {
  const chart = {
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  useEffect(() => {
    document.title = "Dashboard - E Commerce";
  }, []);

  return (
    <Fragment>
      <SellerNavbarDashboard />
      <section className="container my-4 pb-4">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={carousel1} className="d-block w-100" alt="carousel" />
            </div>
            <div className="carousel-item">
              <img src={carousel1} className="d-block w-100" alt="carousel" />
            </div>
            <div className="carousel-item">
              <img src={carousel1} className="d-block w-100" alt="carousel" />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="row justify-content-between my-5">
          <div className="col-md-5 mb-4">
            <div className="card daily-task2">
              <div className="card-body">
                <h5>Daily Tasks</h5>
                <hr />
                <div className="row mt-5 status">
                  <div className="col-4 text-center">
                    <p>0</p>
                    <p>Pending Delivery</p>
                  </div>
                  <div className="col-4 text-center">
                    <p>0</p>
                    <p>Completed Delivery</p>
                  </div>
                  <div className="col-4 text-center">
                    <p>2</p>
                    <p>Refunds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card performance2">
              <div className="card-body">
                <h5>Store Performance</h5>
                <hr />
                <Chart
                  options={chart.options}
                  series={chart.series}
                  type="area"
                  height={150}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Dashboard;
