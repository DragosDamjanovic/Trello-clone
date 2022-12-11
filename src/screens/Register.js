import React, { useEffect, useState } from "react";
import "../Styles/pages/register.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import Loading from "./../components/LoadingError/Loading";
import { register } from "../Redux/Actions/UserAction";
import { useNavigate } from "react-router-dom";

const Register = () => {
  window.scrollTo(0, 0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <>
      <div className="register-page">
        <div className="main-content m-0">
          <div className="register-content m-0">
            <div className="register-bg">
              <div className="register-box">
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}
                <div className="register-box-1">
                  <h2>
                    <strong>Trello clone</strong>
                  </h2>
                  <form className="register-form" onSubmit={submitHandler}>
                    <div className="group">
                      <div className="group-inner">
                        <label className="label-1">Name</label>
                        <input
                          className="input-2 input-icon icon-user-1"
                          type="name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="group">
                      <div className="group-inner">
                        <label className="label-1">Email</label>
                        <input
                          className="input-2 input-icon icon-user-1"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="group">
                      <div className="group-inner">
                        <label className="label-1">Password</label>
                        <input
                          className="input-2 input-icon icon-lock-1"
                          type="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="group-submit">
                      <div className="group-inner">
                        <button
                          type="submit"
                          className="btn-1 color-1 register-submit-btn"
                        >
                          Register{" "}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
