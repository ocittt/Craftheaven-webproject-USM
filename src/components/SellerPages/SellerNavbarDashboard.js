import React from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState } from "react";
import { initilizeFirebase } from "../../firebase";

const NavbarDashboard = () => {
  const location = useLocation();
  const app = initilizeFirebase();
  const db = getDatabase(app);
  const auth = getAuth(app);
  const SellerID = auth.currentUser.uid;
  const [Pic, setPic] = useState(null);
  const [Date, setDate] = useState("");
  const [StoreName, setStoreName] = useState("");

  const getStorePic = ref(db, "Sellers/" + SellerID + "/store_pic");
  onValue(
    getStorePic,
    (snapshot) => {
      const StorePic = snapshot.val();
      setPic(StorePic);
    },
    {
      onlyOnce: true,
    }
  );

  const getStoreDate = ref(db, "Sellers/" + SellerID + "/store_established");
  onValue(
    getStoreDate,
    (snapshot) => {
      const StoreDate = snapshot.val();
      setDate(StoreDate);
    },
    {
      onlyOnce: true,
    }
  );

  const getStoreName = ref(db, "Sellers/" + SellerID + "/store_name");
  onValue(
    getStoreName,
    (snapshot) => {
      const StoreName = snapshot.val();
      setStoreName(StoreName);
    },
    {
      onlyOnce: true,
    }
  );

  return (
    <section className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <div className="d-flex align-items-center">
            <img
              src={
                Pic !== null ? Pic : require("../../assets/defaultstorepic.jpg")
              }
              width={139}
              alt="Store Pic"
            />
            <div className="flex-column">
              <p className="silvia-text ms-4 d-block">{StoreName}</p>
              <p className="joined-text ms-4">Joined on : {Date}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-5">
          <div className="d-flex navigate">
            <div className="border border-dark">
              <Link
                className={`btn ${
                  location.pathname === "/selleraddproduct" ? "btn-dark" : ""
                }`}
                to="/selleraddproduct"
              >
                Add Product
              </Link>
              <Link
                className={`btn ${
                  location.pathname === "/myproduct" ? "btn-dark" : ""
                }`}
                to="/myproduct"
              >
                My Product
              </Link>
              <Link
                className={`btn ${
                  location.pathname === "/sellerdashboard" ? "btn-dark" : ""
                }`}
                to="/sellerdashboard"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavbarDashboard;
