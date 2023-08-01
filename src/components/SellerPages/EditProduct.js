import { getAuth } from "firebase/auth";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { firebaseApp } from "../../firebase";
import SellerNavbarDashboard from "./SellerNavbarDashboard";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { useParams, useHistory } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref as sRef,
} from "firebase/storage";
import { toast } from "react-toastify";
import './Editproduct.css';

const EditProduct = () => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth(firebaseApp);
  const seller = auth.currentUser.uid;
  const params = useParams();
  const history = useHistory();

  const [product, setProduct] = useState({ id: params.id });
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.id]: e.target.value,
    });
  };

  const notify = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        break;
      default:
        break;
    }
  };

  const onPhotoChange = (e) => {
    const storage = getStorage();
    const file = e.target.files[0];
    const randomFileName = `${(Math.random() + 1).toString(36).substring(7)}.${
      file.name.split(".")[1]
    }`;
    const storageRef = sRef(storage, randomFileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProduct({
          ...product,
          photo: downloadURL,
        });
      });
    });
  };

  const editProductHandler = () => {
    setLoading(true);
    const db = getDatabase();
    set(ref(db, "Sellers/" + seller + "/Products/" + params.id), product)
      .then(() => {
        //notify("success", "Data successfully updated");
        console.log("okk");
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading(false);
    history.push("/myproduct");
  };

  useEffect(() => {
    const getProduct = () => {
      const db = getDatabase();
      const product = ref(db, "Sellers/" + seller + "/Products/" + params.id);
      onValue(product, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setProduct(data);
      });
    };
    getProduct();
  }, [seller, params.id]);

  return (
    <div className="bgimg">
      <Fragment>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <section id="add-product" className="container my-4 pb-4">
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />
          <h2 className="text-left mb-3">Edit Product Page</h2>
          <br></br>
          <div className="row">
            <div className="col-md-6">
              <form>
                <div className="mb-5">
                  <label htmlFor="name" className="form-label">
                    Product Name
                  </label>
                  <input
                    className="form-control"
                    id="name"
                    placeholder="Add your product name"
                    value={product.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="category" className="form-label">
                    Product Category
                  </label>
                  <select
                    className="form-select"
                    id="category"
                    name="category"
                    onChange={handleChange}
                  >
                    <option disabled selected>
                      Choose a category
                    </option>
                    <option value="Jewelery">Jewelery</option>
                    <option value="Clothing and Shoes">
                      Clothings and Shoes
                    </option>
                    <option value="Home and Living">Home and Living</option>
                    <option value="Arts">Arts</option>
                    <option value="Toys">Toys</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label htmlFor="quantity" className="form-label">
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="quantity"
                    placeholder="Add your product quantity"
                    value={product.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-5">
                  <label htmlFor="description" className="form-label">
                    Additonal Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    placeholder="Description"
                    rows="5"
                    value={product.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="mb-5">
                  <label htmlFor="price" className="form-label">
                    Product Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    placeholder="Add your product price"
                    value={product.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="my-5">
                  <label htmlFor="photo" className="form-label">
                    Image of Proucts
                  </label>
                  <input
                    className="form-control file"
                    id="photo"
                    type="file"
                    onChange={onPhotoChange}
                  />
                </div>
              </form>
            </div>
            <div className="col-md-5 ms-auto ">
              <div className="card border">
                <div className="card-body1 row align-items-center">
                  <div className="col-md-7 mx-auto">
                    <p className="fw-bold text-center">
                      Your product will be showed in the store like this :
                    </p>
                    <img
                      className="img-fluid"
                      src={product.photo}
                      alt="Product"
                    />
                    <p className="mt-3 text-center">{product.name}</p>
                    <p className="mt-3 text-center">{product.description}</p>
                    <h5 className="mt-5 mb-4 fw-bold text-center">
                      RM {product.price}
                    </h5>
                    <p className="text-muted m-0 text-center">{`${product.quantity} and ${product.category}`}</p>
                    <br></br>
                    <div className="row justify-content-center">
                      <div className="col-md-4 ">
                        <button className="btn btn-outline border border-primary text-primary buy">
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-outline border border-dark btn-lg"
                  onClick={() => {
                    history.push("/myproduct");
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`btn ${
                    loading ? "btn-secondary" : "btn-dark"
                  } btn-lg ms-3`}
                  onClick={editProductHandler}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    </div>
  );
};

export default EditProduct;
