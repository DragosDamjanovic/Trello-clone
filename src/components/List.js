import React, { useEffect } from "react";
import "../Styles/components/list.scss";
import { useDispatch, useSelector } from "react-redux";
import ListEditor from "./ListEditor";
import Card from "./Card";
import PropTypes from "prop-types";
import { getList } from "../Redux/Actions/WorkspaceAction";
import AddCard from "./AddCard";

const List = ({ listId, index }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) =>
    state.workspace.workspace.listObjects.find(
      (object) => object._id === listId
    )
  );

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId]);

  return (
    <div className="list-content">
      <div className="list-header">
        <ListEditor list={list} />
      </div>
      <div className="list-cards">
        {!list ? (
          <AddCard listId={listId} />
        ) : (
          <>
            {list.cards.map((cardId, index) => (
              <Card key={cardId} cardId={cardId} list={list} index={index} />
            ))}
            <AddCard listId={listId} />
          </>
        )}
      </div>
    </div>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;
