import { cartActions } from "../slice/cart-slice";
import { uiActions } from "../slice/ui-slice";

export const getAddItemToCart = (id, quantity) => {
  return async (dispatch, getState) => {
    const fetchData = async () => {
      const response = await fetch(`/api/v1/product/${id}`);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.addItemToCart({
          _id: cartData.product._id,
          name: cartData.product.name,
          price: cartData.product.price,
          image: cartData.product.images[0].url,
          stock: cartData.product.stock,
          quantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch(
    cartActions.removeCartItem({
      _id: id,
    })
  );

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const getShippingInfo = (data) => async (dispatch) => {
  dispatch(
    cartActions.saveShippingInfo({
      shippingInfo: data,
    })
  );

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
