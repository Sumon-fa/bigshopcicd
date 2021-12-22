import { uiActions } from "../slice/ui-slice";
import { authActions } from "../slice/auth-slice";
import { userActions } from "../slice/user-slice";
import axios from "axios";
export const login = (email, password) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(authActions.loader());
      const response = await fetch("/api/v1/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data;
    };

    try {
      const userData = await fetchUserData();
      dispatch(
        authActions.authentication({
          user: userData.user,
          isAuthenticated: true,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
      dispatch(
        authActions.authentication({
          user: null,
          isAuthenticated: false,
        })
      );
    }
    dispatch(authActions.loader());
  };
};
export const register = (formData) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(authActions.loader());
      /*  const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.post("/api/v1/register", formData, config);
      console.log(data);*/
      const response = await fetch("/api/v1/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("User registration failed");
      }

      return data;
    };

    try {
      const usersData = await fetchUserData();

      dispatch(
        authActions.userRegister({
          isAuthenticated: true,
          user: usersData.user,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
      dispatch(
        authActions.userRegister({
          user: null,
          isAuthenticated: false,
        })
      );
    }
    dispatch(authActions.loader());
  };
};

export const userLoad = () => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(authActions.loader());
      /*  const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.post("/api/v1/register", formData, config);
      console.log(data);*/
      const response = await fetch("/api/v1/me");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const usersData = await fetchUserData();

      dispatch(
        authActions.loadUser({
          user: usersData.user,
          isAuthenticated: true,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
      dispatch(
        authActions.loadUser({
          user: null,
          isAuthenticated: false,
        })
      );
    }
    dispatch(authActions.loader());
  };
};

export const updateProfile = (userData) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(userActions.loader());
      const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.put("/api/v1/me/update", userData, config);

      /*const response = await fetch("/api/v1/me/update", {
        method: "PUT",
        body: userData,
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }*/

      return data;
    };

    try {
      const usersData = await fetchUserData();

      dispatch(
        userActions.updateProfile({
          isUpdated: usersData.success,
        })
      );
    } catch (error) {
      const userData = await fetchUserData();
      dispatch(
        uiActions.showNotification({
          message: userData.response.error.message,
        })
      );
      dispatch(
        userActions.updateProfile({
          isUpdated: false,
        })
      );
    }
    dispatch(userActions.loader());
  };
};

export const logout = () => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(authActions.loader());
      /*  const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.post("/api/v1/register", formData, config);
      console.log(data);*/
      const response = await fetch("/api/v1/logout");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      await fetchUserData();

      dispatch(
        authActions.logout({
          user: null,
          isAuthenticated: false,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(authActions.loader());
  };
};

export const updatePassword = (passwords) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(userActions.loader());
      /*const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.put("/api/v1/me/update", userData, config);
      console.log(data);*/
      const response = await fetch("/api/v1/password/update", {
        method: "PUT",
        body: passwords,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const usersData = await fetchUserData();

      dispatch(
        userActions.updateProfile({
          isUpdated: usersData.success,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
      dispatch(
        userActions.updateProfile({
          isUpdated: false,
        })
      );
    }
    dispatch(userActions.loader());
  };
};
export const forgotPassword = (email) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(userActions.loader());
      /*const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.put("/api/v1/me/update", userData, config);
      console.log(data);*/
      const response = await fetch("/api/v1/password/forgot", {
        method: "POST",
        body: email,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const usersData = await fetchUserData();

      dispatch(
        userActions.forgot({
          message: usersData.message,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
      dispatch(
        userActions.forgot({
          isUpdated: false,
        })
      );
    }
    dispatch(userActions.loader());
  };
};

export const resetPassword = (token, passwords) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(userActions.loader());
      /*const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.put("/api/v1/me/update", userData, config);
      console.log(data);*/
      const response = await fetch(`/api/v1/password/reset/${token}`, {
        method: "PUT",
        body: passwords,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const usersData = await fetchUserData();

      dispatch(
        userActions.newPassword({
          success: usersData.success,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(userActions.loader());
  };
};

export const getAllUsers = () => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(userActions.loader());
      /*const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.put("/api/v1/me/update", userData, config);
      console.log(data);*/
      const response = await fetch("/api/v1/admin/users");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const usersData = await fetchUserData();

      dispatch(
        userActions.allUsers({
          users: usersData.users,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(userActions.loader());
  };
};
export const deleteUser = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(userActions.loader());
      const response = await fetch(`/api/v1/admin/user/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const userData = await fetchData();

      dispatch(
        userActions.removeUser({
          isDeleted: userData.success,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(userActions.loader());
  };
};
export const updateUser = (id, formData) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(userActions.loader());
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/admin/user/${id}`,
        formData,
        config
      );

      return data;
    };

    try {
      const userData = await fetchData();

      dispatch(
        userActions.userUpdate({
          isUpdate: userData.success,
        })
      );
    } catch (error) {
      const userItem = await fetchData();
      dispatch(
        uiActions.showNotification({
          message: userItem.response.error.message,
        })
      );
    }
    dispatch(userActions.loader());
  };
};
export const getUserDetails = (id) => {
  return async (dispatch) => {
    const fetchUserData = async () => {
      dispatch(userActions.loader());
      /*const config = { "Content-type": "multipart/form-data" };
      const { data } = await axios.put("/api/v1/me/update", userData, config);
      console.log(data);*/
      const response = await fetch(`/api/v1/admin/user/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    };

    try {
      const userData = await fetchUserData();

      dispatch(
        userActions.details({
          user: userData.user,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          message: error.message,
        })
      );
    }
    dispatch(userActions.loader());
  };
};
