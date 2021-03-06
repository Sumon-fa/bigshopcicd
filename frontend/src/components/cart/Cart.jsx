import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";

import MetaData from "../layout/MetaData";

import { useDispatch, useSelector } from "react-redux";
import {
  getAddItemToCart,
  removeItemFromCart,
} from "../../store/action/cart-actions";
const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQty = (id, quantity, stock) => {
    const newQty = quantity + 1;

    if (newQty > stock) return;

    dispatch(getAddItemToCart(id, newQty));
  };

  const decreaseQty = (id, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    dispatch(getAddItemToCart(id, newQty));
  };
  const removeCartItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  const unit = cartItems.reduce((acc, item) => acc + Number(item.quantity), 0);
  const totaPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity * item.price),
    0
  );

  return (
    <Fragment>
      <MetaData title={"Your cart"} />
      {cartItems.length === 0 ? (
        <h2 className="mt-5">Your CartItem is empty </h2>
      ) : (
        <Fragment>
          <div class="container container-fluid">
            <h2 class="mt-5">
              Your Cart: <b>{cartItems.length}</b>
            </h2>

            <div class="row d-flex justify-content-between">
              <div class="col-12 col-lg-8">
                {cartItems.map((item) => (
                  <Fragment>
                    <hr />
                    <div class="cart-item">
                      <div class="row">
                        <div class="col-4 col-lg-3">
                          <img
                            src={item.image}
                            alt="Laptop"
                            height="90"
                            width="115"
                          />
                        </div>

                        <div class="col-5 col-lg-3">
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </div>

                        <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p id="card_item_price">{item.price.toFixed(2)}</p>
                        </div>

                        <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                          <div class="stockCounter d-inline">
                            <span
                              class="btn btn-danger minus"
                              onClick={() =>
                                decreaseQty(item._id, item.quantity)
                              }
                            >
                              -
                            </span>
                            <input
                              type="number"
                              class="form-control count d-inline"
                              value={item.quantity}
                              readOnly
                            />

                            <span
                              class="btn btn-primary plus"
                              onClick={() =>
                                increaseQty(item._id, item.quantity, item.stock)
                              }
                            >
                              +
                            </span>
                          </div>
                        </div>

                        <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                          <i
                            id="delete_cart_item"
                            class="fa fa-trash btn btn-danger"
                            onClick={() => removeCartItemHandler(item._id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                ))}
              </div>

              <div class="col-12 col-lg-3 my-4">
                <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>
                    Subtotal:{" "}
                    <span class="order-summary-values"> {unit}(Units)</span>
                  </p>
                  <p>
                    Est. total:{" "}
                    <span class="order-summary-values">
                      ${totaPrice.toFixed(2)}
                    </span>
                  </p>

                  <hr />
                  <button
                    id="checkout_btn"
                    class="btn btn-primary btn-block"
                    onClick={checkoutHandler}
                  >
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
