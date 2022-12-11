import React from "react";
import "../Styles/components/header.scss";
import { useSelector } from "react-redux";

const Card = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { cardInfo } = userLogin;

  return (
    <div className="cards">
      {cardInfo.map((item) => (
        <div className="card">{item.title}</div>
      ))}
    </div>
  );
};

export default Card;
