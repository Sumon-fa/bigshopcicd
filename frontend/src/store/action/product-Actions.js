import { uiActions } from "../slice/ui-slice";
import { productActions } from "../slice/product-Slice";
import { productDetailsActions } from "../slice/productDetails-slice";
export const getProducts = (
  keyword = "",
  currentPage = 1,
  price,
  category,
  rating = 0
) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(productActions.loader());
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;
      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
      }
      const response = await fetch(link);
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await response.json();

      return data;
    };

    try {
      const productData = await fetchData();

      dispatch(
        productActions.allProduct({
          products: productData.products || [],
          productCount: productData.productCount,
          resPerPage: productData.resPerPage,
          filteredProductsCount: productData.filteredProductsCount,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(productActions.loader());
  };
};

export const getProductsDetails = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(productDetailsActions.loader());
      const response = await fetch(`/api/v1/product/${id}`);
      if (!response.ok) {
        throw new Error("something went wrong");
      }

      const data = await response.json();

      return data;
    };

    try {
      const productData = await fetchData();

      dispatch(
        productDetailsActions.productDetails({
          product: productData.product || {},
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(productDetailsActions.loader());
  };
};

export const getAdminProducts = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(productActions.loader());
      const response = await fetch("/api/v1/admin/products");

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const productData = await fetchData();

      dispatch(
        productActions.adminProducts({
          products: productData.products || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(productActions.loader());
  };
};

export const newProduct = (formData) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(productDetailsActions.loader());
      /*  const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.post("/api/v1/register", formData, config);
      console.log(data);*/
      const response = await fetch("/api/v1/admin/product/new", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const productData = await fetchUserData();

      dispatch(
        productDetailsActions.createProduct({
          success: productData.success,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(productDetailsActions.loader());
  };
};
export const deleteProducts = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(productActions.loader());
      const response = await fetch(`/api/v1/admin/product/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const productData = await fetchData();

      dispatch(
        productActions.removeProducts({
          isDeleted: productData.success,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(productActions.loader());
  };
};
export const productUpdating = (formData, id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(productActions.loader());
      const response = await fetch(`/api/v1/admin/product/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const productData = await fetchData();

      dispatch(
        productActions.updateProduct({
          isUpdated: productData.success,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(productActions.loader());
  };
};
