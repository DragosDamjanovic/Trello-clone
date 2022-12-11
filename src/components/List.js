import React from "react";
import "../Styles/components/header.scss";
import { useSelector } from "react-redux";
import ListEditor from "./ListEditor";
import Card from "./Card";

const List = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { cardsInfo } = userLogin;

  return (
    <div className="list-wrapper">
      <div className="list-content">
        <div className="list-header">
          <ListEditor />
        </div>
        <div className="list-cards">
          {cardsInfo.map((item) => (
            <Card item={item} />
          ))}
        </div>
        <div className="add-card-container"></div>
      </div>
    </div>
  );
};

export default List;
