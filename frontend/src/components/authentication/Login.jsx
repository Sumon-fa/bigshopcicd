import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router";
import { login } from "../../store/action/auth-Actions";
import { uiActions } from "../../store/slice/ui-slice";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const errorNotification = useSelector((state) => state.ui.notification);

  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  
  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      history.push(redirect);
    }
    if (errorNotification) {
      alert.error(errorNotification);
      dispatch(
        uiActions.showNotification({
          notification: null,
        })
      );
    }
  }, [dispatch, isAuthenticated, alert, history, errorNotification, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Login" />
          <div className="container container-fluid">
            <div className="row wrapper">
              <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="mb-3">Login</h1>
                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                      type="email"
                      id="email_field"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

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

                  <Link to="/password/forgot" className="float-right mb-4">
                    Forgot Password?
                  </Link>

                  <button
                    id="login_button"
                    type="submit"
                    className="btn btn-block py-3"
                  >
                    LOGIN
                  </button>

                  <Link to="/register" className="float-right mt-3">
                    New User?
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
