import React from "react";
import "../Styles/components/header.scss";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const Card = () => {
  return (
    <div className="cards">
      {/* {cardInfo.map((item) => (
        <div className="card">{item.title}</div>
      ))} */}
    </div>
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
