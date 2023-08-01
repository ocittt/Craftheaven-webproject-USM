import React, { Fragment, useEffect } from "react";
import carousel1 from "../../assets/carousel/1.png";
import "../../components/Pages/Customerhome.css";

const Customerhome = () => {
  useEffect(() => {
    document.title = "Dashboard - E Commerce";
  }, []);
  return (
    <Fragment>
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
      </section>
    </Fragment>
  );
};

export default Customerhome;
