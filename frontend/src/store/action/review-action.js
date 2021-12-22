import { reviewActions } from "../slice/review-slice";
import { uiActions } from "../slice/ui-slice";

export const getProductReviewById = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(reviewActions.loader());
      const response = await fetch(`/api/v1/reviews?id=${id}`);

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const reviewData = await fetchData();
      dispatch(
        reviewActions.productReview({
          review: reviewData.reviews,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(reviewActions.loader());
  };
};
export const newReview = (formData) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(reviewActions.loader());
      /*  const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.post("/api/v1/register", formData, config);
      console.log(data);*/
      const response = await fetch("/api/v1/review", {
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
      const reviewData = await fetchUserData();

      dispatch(
        reviewActions.newProductReview({
          success: reviewData.success,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(reviewActions.loader());
  };
};

export const updateProductRevies = (formData) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(reviewActions.loader());
      /*  const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.post("/api/v1/register", formData, config);
      console.log(data);*/
      const response = await fetch("/api/v1/review", {
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
      const reviewData = await fetchUserData();

      dispatch(
        reviewActions.newProductReview({
          newReview: reviewData.reviews,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(reviewActions.loader());
  };
};
