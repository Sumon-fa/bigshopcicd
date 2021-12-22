import { uiActions } from "../slice/ui-slice";
import { orderActions } from "../slice/order-slice";
import axios from "axios";

/*export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(orderActions.loader());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/v1/order/new", order, config);

    const response = await fetch("/api/v1/order/new", {
      method: "POST",
      body: order,
    });
    const data = await response.json();
    dispatch(
      orderActions.orderCreate({
        orderData: data,
      })
    );
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        message: error.response.data.message,
      })
    );
  }
  dispatch(orderActions.loader());
};*/

export const createOrder = (order) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(orderActions.loader());
      const response = await fetch("/api/v1/order/new", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-type": "application/json" },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const orderData = await fetchData();

      dispatch(
        orderActions.orderCreate({
          success: orderData.success,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(orderActions.loader());
  };
};

export const getMyOrders = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(orderActions.loader());
      const response = await fetch("/api/v1/orders/me");

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const orderData = await fetchData();

      dispatch(
        orderActions.myOrders({
          myOrdersData: orderData.orders,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(orderActions.loader());
  };
};

export const getMyOrderDetails = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(orderActions.loader());
      const response = await fetch(`/api/v1/order/${id}`);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const orderData = await fetchData();

      dispatch(
        orderActions.orderDetails({
          order: orderData.order,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(orderActions.loader());
  };
};

export const getAllOrder = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(orderActions.loader());
      const response = await fetch("/api/v1/admin/orders");

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const orderData = await fetchData();

      dispatch(
        orderActions.allOrders({
          allOrder: orderData.orders,
          totalAmount: orderData.totalAmount,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(orderActions.loader());
  };
};

export const updateOrder = (id, formData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(orderActions.loader());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/admin/order/${id}`,
        formData,
        config
      );

      return data;
    };

    try {
      var orderData = await fetchData();

      dispatch(
        orderActions.orderUpdate({
          isUpdated: orderData.success,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: orderData.response.error.message,
        })
      );
    }
    dispatch(orderActions.loader());
  };
};

export const deleteOrder = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(orderActions.loader());
      const response = await fetch(`/api/v1/admin/order/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const orderData = await fetchData();

      dispatch(
        orderActions.removeOrder({
          isDeleted: orderData.success,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(orderActions.loader());
  };
};
