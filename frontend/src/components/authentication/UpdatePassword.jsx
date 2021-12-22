import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router";
import MetaData from "../layout/MetaData";
import { uiActions } from "../../store/slice/ui-slice";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../store/action/auth-Actions";
import { userActions } from "../../store/slice/user-slice";

const UpdatePassword = () => {
  const history = useHistory();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const errorNotification = useSelector((state) => state.ui.notification);

  const { isUpdated, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (errorNotification) {
      alert.error(errorNotification);
      dispatch(
        uiActions.showNotification({
          notification: null,
        })
      );
    }

    if (isUpdated) {
      alert.success("Password updated successfully");

      history.push("/me");
      dispatch(
        userActions.updateProfile({
          isUpdated: false,
        })
      );
    }
  }, [dispatch, alert, errorNotification, history, isUpdated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("password", password);

    dispatch(updatePassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Change Password"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mt-2 mb-5">Update Password</h1>
            <div className="htmlForm-group">
              <label htmlFor="old_password_field">Old Password</label>
              <input
                type="password"
                id="old_password_field"
                className="htmlForm-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="htmlForm-group">
              <label htmlFor="new_password_field">New Password</label>
              <input
                type="password"
                id="new_password_field"
                className="htmlForm-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={isLoading ? true : false}
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdatePassword;
