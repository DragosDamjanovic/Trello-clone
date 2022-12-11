import React from "react";
import "../Styles/components/header.scss";
import { useSelector } from "react-redux";
import List from "./List";

const Workplace = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { listsInfo } = userLogin;

  return (
    <div id="board" className="board">
      {listsInfo.map((item) => (
        <List item={item} />
      ))}
    </div>
  );
};

export default Workplace;
