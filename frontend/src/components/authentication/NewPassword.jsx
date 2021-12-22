import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { uiActions } from "../../store/slice/ui-slice";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { resetPassword } from "../../store/action/auth-Actions";
const NewPassword = () => {
  const history = useHistory();
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const alert = useAlert();
  const dispatch = useDispatch();
  const errorNotification = useSelector((state) => state.ui.notification);

  const { success } = useSelector((state) => state.user);

  useEffect(() => {
    if (errorNotification) {
      alert.error(errorNotification);
      dispatch(
        uiActions.showNotification({
          notification: null,
        })
      );
    }

    if (success) {
      alert.success("Password updated successfully");
      history.push("/login");
    }
  }, [dispatch, alert, errorNotification, success, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(params.token, formData));
  };

  return (
    <Fragment>
      <MetaData title={"New Password Reset"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">New Password</h1>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password_field">Confirm Password</label>
              <input
                type="password"
                id="confirm_password_field"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              id="new_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
