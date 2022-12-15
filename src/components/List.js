import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import PropTypes from "prop-types";
import { getList, renameList } from "../Redux/Actions/WorkspaceAction";
import AddCard from "./AddCard";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const List = ({ listId, index }) => {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");

  const list = useSelector((state) =>
    state.workspace.workspace.listObjects.find(
      (object) => object._id === listId
    )
  );

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId]);

  useEffect(() => {
    if (list) {
      setTitle(list.title);
    }
  }, [list]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameList(list._id, { title }));
    setEditing(false);
  };

  return (
    <div className="list-content d-flex flex-column">
      <div className="list-header row text-center">
        {!editing ? (
          <h3 className="list-title" onClick={() => setEditing(true)}>
            {title}
          </h3>
        ) : (
          <form onSubmit={(e) => onSubmit(e)}>
            <TextareaAutosize
              autoFocus
              className="list-title-textarea"
              placeholder={title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        )}
      </div>

      {!list ? (
        <AddCard listId={listId} />
      ) : (
        <>
          <Droppable droppableId={listId} type="card">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className="list-cards row">
                  {list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      list={list}
                      index={index}
                    />
                  ))}
                </div>
                <AddCard listId={listId} />
              </div>
            )}
          </Droppable>
        </>
      )}
    </div>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;
