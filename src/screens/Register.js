import React, { useEffect, useState } from "react";
import "../Styles/pages/login2.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../Redux/Actions/UserAction";
import Message from "./../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push("/dashboard");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <div className="col-6 d-flex flex-column align-items-center justify-content-center">
          <header className="logo-wrapper text-center">
            <div className="logo d-inline-block">
              <img src="../../public/trello-logo.jpg" alt="Trello logo" />
            </div>
          </header>
          <section className="form-wrapper col-7 d-flex flex-column align-items-center">
            <div className="d-flex align-items-center text-center mb-2">
              <h5>Log in to continue</h5>
            </div>

            <Box
              component="form"
              autoComplete="off"
              className="Login col-10 d-flex flex-column align-items-center"
              id="loginForm"
              onSubmit={submitHandler}
            >
              <TextField
                required
                className="mb-4"
                type="name"
                label="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />

              <TextField
                required
                className="mb-4"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <TextField
                required
                className="mb-4"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                type="submit"
                variant="contained"
                className="btn btn-primary text-center"
              >
                <Link to={"/dashboard"}>Register</Link>
              </Button>
              <p>
                <Link to={"/"}>Log in</Link>
              </p>
            </Box>
          </section>
        </div>
      </div>
    </>
  );
};

export default Register;
