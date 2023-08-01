import React, { Fragment, useEffect, useState } from "react";
import "./AddProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { getDatabase, set, ref as database_ref } from "firebase/database";
import { getAuth } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import { initilizeFirebase } from "../../firebase";
import SellerNavbarDashboard from "./SellerNavbarDashboard";
import { Link, useHistory } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const app = initilizeFirebase();
  const db = getDatabase(app);
  const auth = getAuth(app);
  const history = useHistory();

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
    const storageRef = ref(storage, randomFileName);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFileUrl(downloadURL);
      });
    });
  };

  const submitProductHandler = async () => {
    setLoading(true);
    if (
      productName.length &&
      productCategory.length &&
      productQuantity > 0 &&
      description.length &&
      price > 0 &&
      fileUrl != null
    ) {
      try {
        const seller = auth.currentUser.uid;
        set(
          database_ref(
            db,
            "Sellers/" + seller + "/Products/" + new Date().getTime() + "/"
          ),
          {
            id: new Date().getTime(),
            name: productName,
            category: productCategory,
            quantity: productQuantity,
            photo: fileUrl,
            price: price,
            description: description,
          }
        );

        cancelHandler();
        //notify("success", "Product added successfully");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      notify("error", "Please fill out the form correctly");
    }
    setLoading(false);
    history.push("/myproduct");
  };

  const cancelHandler = () => {
    setProductName("");
    setProductCategory("");
    setProductQuantity(0);
    setFileUrl(null);
    setPrice(0);
    setDescription("");
  };

  useEffect(() => {
    document.title = "Add Product - E Commerce";
  }, []);

  return (
    <Fragment>
      <SellerNavbarDashboard />
      <div className="add-product">
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
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="category" className="form-label">
                  Product Category
                </label>
                <select
                  className="form-select"
                  id="category"
                  onChange={(e) => setProductCategory(e.target.value)}
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
                <label htmlFor="price" className="form-label">
                  Product Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  placeholder="Add your product quantity"
                  onChange={(e) => setProductQuantity(e.target.value)}
                  value={productQuantity}
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
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
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
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
              <div className="my-5">
                <label htmlFor="photo" className="form-label">
                  Image of Proucts
                </label>
                <input
                  className="form-control file"
                  id="photo"
                  onChange={onPhotoChange}
                  type="file"
                />
              </div>
            </form>
          </div>
          <div className="col-md-5 ms-auto ">
            <div className="card border">
              <div className="card-body row align-items-center">
                <div className="col-md-7 mx-auto">
                  <p className="fw-bold text-center">
                    Your product will be showed in the store like this :
                  </p>
                  <img
                    className="img-fluid"
                    src={
                      fileUrl !== null
                        ? fileUrl
                        : require("../../assets/defaultstorepic.jpg")
                    }
                    alt="Product"
                  />
                  <p className="mt-3 text-center">
                    {productName.length ? productName : "Product Name"}
                  </p>
                  <p className="mt-3 text-center">
                    {description.length ? description : "Description"}
                  </p>
                  <h5 className="mt-5 mb-4 fw-bold text-center">
                    RM {price > 0 ? price : 0}
                  </h5>
                  <p className="text-muted m-0 text-center">
                    {productQuantity > 0 ? productQuantity : "Quantity"} and{" "}
                    {productCategory.length ? productCategory : "Category"}
                  </p>
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
                onClick={cancelHandler}
              >
                Cancel
              </button>
              <button
                className={`btn ${
                  loading ? "btn-secondary" : "btn-dark"
                } btn-lg ms-3`}
                onClick={submitProductHandler}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </Fragment>
  );
};

export default AddProduct;
