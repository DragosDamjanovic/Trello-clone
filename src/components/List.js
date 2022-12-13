import React, { useEffect } from "react";
import "../Styles/components/header.scss";
import { useDispatch, useSelector } from "react-redux";
import ListEditor from "./ListEditor";
import Card from "./Card";
import PropTypes from "prop-types";
import { getWorkspace } from "../Redux/Actions/WorkspaceAction";

const List = ({ listId, index }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) =>
    state.workspace.workspace.listObjects.find(
      (object) => object._id === listId
    )
  );

  console.log(list);

  useEffect(() => {
    dispatch(getWorkspace());
  }, [dispatch]);

  return (
    <>
      <div className="list-wrapper">
        <div className="list-content">
          <div className="list-header">
            <ListEditor />
          </div>
          <div className="list-cards">
            {list.cards.map((cardId, index) => (
              <Card key={cardId} cardId={cardId} index={index} />
            ))}
          </div>
          <div className="add-card-container"></div>
        </div>
      </div>
    </>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;
