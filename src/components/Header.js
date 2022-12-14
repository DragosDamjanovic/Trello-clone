import React from "react";
import "../Styles/components/header.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/UserAction";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div className="board-header">
      <div className="board-header-btn">
        <h1 className="board-header-title">{userInfo.name}</h1>
      </div>
      <div className="board-header-user">
        <div className="board-header-member">
          <a id="member-count" className="btn-member-count" href="/"></a>
        </div>
      </div>
    </div>
  );
};

export default Header;
