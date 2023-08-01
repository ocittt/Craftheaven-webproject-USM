import "../../components/Pages/Searchpage.css";
import { GoChevronRight } from "react-icons/go";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import React, { Fragment, useEffect, useState } from "react";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { Link, useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { initilizeFirebase } from "../../firebase";

const Searchpage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(0);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [buy_quan, setBuy_quan] = useState(0);

  const [categoryFilter, setCategoryFilter] = useState({
    jewelery: false,
    arts: false,
    toys: false,
    homeAndLiving: false,
    accessories: false,
    clothingAndShoes: false,
  });

  const checkedCategoryHandler = (category) => {
    setCategoryFilter({
      ...categoryFilter,
      [`${category}`]: !categoryFilter[`${category}`],
    });
  };

  const applyCategoryFilterHandler = () => {
    const temp = [];
    for (const [key, value] of Object.entries(categoryFilter)) {
      value &&
        temp.push(
          key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase())
            .replace("And", "and")
        );
    }

    const filtered = [];
    temp.forEach((e) => {
      for (let i = 0; i < products.length; i++) {
        if (e === products[i].category) filtered.push(products[i]);
      }
    });

    setProducts(filtered);
  };

  const filterPriceHandler = () => {
    if (highPrice > 0) {
      setProducts(
        products.filter(
          (product) => product.price >= lowPrice && product.price <= highPrice
        )
      );
    } else {
      getProducts();
    }
  };

  const getProducts = () => {
    setLoading(true);
    const db = getDatabase();
    const productsRef = ref(db, "Sellers/");
    const arr = [];
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      arr.push(data);
      const basket = [];

      Object.entries(arr[0]).forEach((e) => {
        let item = e[1].Products;
        for (const [key, value] of Object.entries(item)) {
          basket.push({
            id: value.id,
            name: value.name,
            price: value.price,
            photo: value.photo,
            category: value.category,
            quantity: value.quantity,
            description: value.description,
          });
        }
      });
      setProducts(basket);
      setLoading(false);
    });
  };

  const resetFilterHandler = () => {
    getProducts();
    setCategoryFilter({
      jewelery: false,
      arts: false,
      toys: false,
      homeAndLiving: false,
      accessories: false,
      clothingAndShoes: false,
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Fragment>
      <section className="container mt-3">
        <div className="row">
          <p className="silvia-text ms-4 d-block">Search</p>
          <div className="input-group mb-4">
            <input
              type="search"
              className="form-control"
              placeholder="Type to search..."
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body fw-bold">
                <p>Price (RM)</p>
                <div className="d-flex">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Low"
                    onChange={(e) => setLowPrice(e.target.value)}
                  />
                  <p className="m-0 fs-5 mx-3">to</p>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="High"
                    onChange={(e) => setHighPrice(e.target.value)}
                  />
                  <GoChevronRight
                    className="display-6 ms-3"
                    onClick={filterPriceHandler}
                    style={{ cursor: "pointer" }}
                  />
                </div>

                <p className="mt-5">Colour</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="black"
                  />
                  <label className="form-check-label" htmlFor="black">
                    Black
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="white"
                  />
                  <label className="form-check-label" htmlFor="white">
                    White
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="Brown"
                  />
                  <label className="form-check-label" htmlFor="Brown">
                    Brown
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="Beige"
                  />
                  <label className="form-check-label" htmlFor="Beige">
                    Beige
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="Beige"
                  />
                  <label className="form-check-label" htmlFor="Beige">
                    Custom
                  </label>
                </div>

                <p className="mt-5">Category</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Jewelery"
                    id="jewelery"
                    checked={categoryFilter.jewelery}
                    onChange={(e) => checkedCategoryHandler(e.target.id)}
                  />
                  <label className="form-check-label" htmlFor="Jewelery">
                    Jewelery
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Arts"
                    id="arts"
                    checked={categoryFilter.arts}
                    onChange={(e) => checkedCategoryHandler(e.target.id)}
                  />
                  <label className="form-check-label" htmlFor="Arts">
                    Arts
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Toys"
                    id="toys"
                    checked={categoryFilter.toys}
                    onChange={(e) => checkedCategoryHandler(e.target.id)}
                  />
                  <label className="form-check-label" htmlFor="Toys">
                    Toys
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Home and Living"
                    id="homeAndLiving"
                    checked={categoryFilter.homeAndLiving}
                    onChange={(e) => checkedCategoryHandler(e.target.id)}
                  />
                  <label className="form-check-label" htmlFor="homeAndLiving">
                    Home and Living
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Accessories"
                    id="accessories"
                    checked={categoryFilter.accessories}
                    onChange={(e) => checkedCategoryHandler(e.target.id)}
                  />
                  <label className="form-check-label" htmlFor="accessories">
                    Accessories
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Clothing and Shoes"
                    id="clothingAndShoes"
                    checked={categoryFilter.clothingAndShoes}
                    onChange={(e) => checkedCategoryHandler(e.target.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="clothingAndShoes"
                  >
                    Clothing and Shoes
                  </label>
                </div>

                <div className="text-center mt-5 mb-3 d-flex justify-content-evenly">
                  <button
                    className="btn btn-dark"
                    onClick={applyCategoryFilterHandler}
                  >
                    Apply
                  </button>
                  <button className="btn btn-dark" onClick={resetFilterHandler}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              {!loading ? (
                products.length > 0 ? (
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
                    .map((product, key) => {
                      return (
                        <div className="col-md-4 col-6 mb-3" key={key}>
                          <div
                            className="card"
                            type="button"
                            onClick={(e) => {
                              setName(product.name);
                              setCategory(product.category);
                              setPhoto(product.photo);
                              setQuantity(product.quantity);
                              setPrice(product.price);
                              setDescription(product.description);
                              setId(product.id);
                            }}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <img
                              src={product.photo}
                              className="card-img-top img-fluid"
                              alt={product.name}
                              style={{ height: "200px" }}
                            />
                            <div className="card-body">
                              <h5>{product.name}</h5>
                              <br></br>
                              <p>RM {product.price}</p>
                              <p className="text-muted mt-3" id="cat">
                                {product.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <h5>The product you are looking for does not exist</h5>
                )
              ) : (
                <h5>Loading products...</h5>
              )}
            </div>
          </div>
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Product Details
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body dis">
                  <div className="center-image">
                    <img
                      src={photo}
                      className="card-img-top img-fluid"
                      alt="dsvs"
                      style={{ height: "200px", width: "200px" }}
                    />
                  </div>
                  <div>
                    <h4>{name}</h4>
                    <br></br>
                    <div>Price: RM {price}</div>
                    <br></br>
                    <div>
                      {" "}
                      Quantity:
                      <br></br>
                      <input
                        type="number"
                        onChange={(e) => {
                          setBuy_quan(e.target.value);
                        }}
                      />
                    </div>
                    <br></br>
                    <div>Category: {category}</div>
                    <br></br>
                    <div>
                      Description: <br></br>
                      {description}
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn-secondary btn-dark btn-lg ms-3"
                    onClick={(e) => {
                      const app = initilizeFirebase();
                      const db = getDatabase(app);
                      const auth = getAuth(app);
                      const buyer = auth.currentUser.uid;
                      set(
                        ref(
                          db,
                          "Customers/" +
                            buyer +
                            "/Checkout_Products/" +
                            id +
                            "/"
                        ),
                        {
                          id: id,
                          name: name,
                          price: price,
                          photo: photo,
                          category: category,
                          quantity: buy_quan,
                          description: description,
                        }
                      );
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">Added to Cart!!!</div>
                <div class="modal-footer"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Searchpage;
