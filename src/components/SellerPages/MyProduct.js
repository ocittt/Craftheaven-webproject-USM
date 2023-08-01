import React, { Fragment, useEffect, useState } from "react";
import { BiSearchAlt2, BiPencil, BiTrash, BiWindows } from "react-icons/bi";
import {
  getDatabase,
  set,
  ref as database_ref,
  onValue,
  remove,
  ref,
} from "firebase/database";
import { initilizeFirebase } from "../../firebase";
import { getAuth } from "firebase/auth";
import SellerNavbarDashboard from "./SellerNavbarDashboard";
import { Link } from "react-router-dom";


const MyProduct = () => {
  var [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const app = initilizeFirebase();
  const db = getDatabase(app);
  const auth = getAuth(app);
  const seller = auth.currentUser.uid;

  useEffect(() => {
    setLoading(true);
    var dr = database_ref(db, "Sellers/" + seller + "/Products/");
    onValue(dr, function (snapshot) {
      var data = [];
      snapshot.forEach(function (element) {
        data.push(element.val());
      });
      setProducts(data);
    });
    setLoading(false);
  }, []);

  let i = 1;
  return (
  
    <Fragment>
      <SellerNavbarDashboard />
      <section className="container my-4 pb-4">
        <div className="row">
          <div className="col-12">
            <div className="card border-2 border-dark">
              <div className="card body p-4">
                <div className="row">
                  <div className="col-md-3">
                    <div className="input-group mb-3">
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Type to Search..."
                        aria-label="Search"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <table className="table" id="edit1">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Photo</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                      <th scope="col">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {" "}
                    {!loading ? (
                      products.length ? (
                        products
                          .filter((product) => {
                            if (search === "") {
                              return product;
                            } else if (
                              product.name
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return product;
                            }
                          })
                          .map((product) => (
                            <tr key={product.photo}>
                              <th scope="row">{i++}</th>
                              <td>
                                <img
                                  src={product.photo}
                                  alt="product"
                                  width={70}
                                />
                              </td>
                              <td>{product.name}</td>
                              <td>{product.quantity}</td>
                              <td>{product.price}</td>
                              <td>{product.category}</td>
                              <td>
                                <Link
                                  to={`editproduct/${product.id}`}
                                  className="btn btn-outline"
                                >
                                  <BiPencil />
                                </Link>
                                <button
                                  className="btn btn-outline"
                                  onClick={() =>
                                    remove(
                                      database_ref(
                                        db,
                                        "Sellers/" +
                                          seller +
                                          "/Products/" +
                                          product.name
                                      )
                                    )
                                  }
                                >
                                  <BiTrash />
                                </button>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <th>Product doesn't exist yet</th>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <th>Loading...</th>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default MyProduct;
