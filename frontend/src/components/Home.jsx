import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProducts } from "../store/action/product-Actions";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useParams } from "react-router";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Home = () => {
  const alert = useAlert();
  const params = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentpage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const {
    products,
    isLoading,
    productCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const keyword = params.keyword;
  const [rating, setRating] = useState(0);
  const errorNotification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    if (errorNotification) {
      return alert.error(errorNotification);
    }

    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [
    dispatch,
    alert,
    errorNotification,
    currentPage,
    keyword,
    price,
    category,
    rating,
  ]);
  function setCurrentPageNo(pageNumber) {
    setCurrentpage(pageNumber);
  }

  let count = productCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  return (
    <Fragment>
      <MetaData title="Buy Best Products Online" />
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <section id="products" className="container mt-5">
            <h1 id="products_heading">Latest Products</h1>
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />

                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>

                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <hr className="my-3" />

                      <div className="mt-5">
                        <h4 className="mb-3">Ratings</h4>

                        <ul className="pl-0">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={star}
                              onClick={() => setRating(star)}
                            >
                              <div className="rating-outer">
                                <div
                                  className="rating-inner"
                                  style={{
                                    width: `${star * 20}%`,
                                  }}
                                ></div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Product
                          key={product._id}
                          id={product._id}
                          name={product.name}
                          price={product.price}
                          numOfReviews={product.numOfReviews}
                          ratings={product.ratings}
                          url={product.images[0].url}
                          col={4}
                        />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  {products.map((product) => (
                    <Product
                      key={product._id}
                      id={product._id}
                      name={product.name}
                      price={product.price}
                      numOfReviews={product.numOfReviews}
                      ratings={product.ratings}
                      url={product.images[0].url}
                      col={3}
                    />
                  ))}
                </Fragment>
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
