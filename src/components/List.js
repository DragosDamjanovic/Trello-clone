import React, { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import PropTypes from "prop-types";
import {
  deleteList,
  getList,
  renameList,
} from "../Redux/Actions/WorkspaceAction";
import AddCard from "./AddCard";
import { message, Popconfirm } from "antd";
import { Button } from "antd";
import CloseIcon from "@mui/icons-material/Close";
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

  const confirm = (e) => {
    console.log(e);
    message.success("The list has been deleted");
    dispatch(deleteList(listId));
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          className="list-wrapper col-2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="list-content d-flex flex-column">
            <div className="list-header row d-flex flex-row">
              {!editing ? (
                <>
                  <div
                    className="list-title col-8"
                    onClick={() => setEditing(true)}
                  >
                    {title}
                  </div>
                  <div className="col-4">
                    <Popconfirm
                      title="Delete the list"
                      description="Are you sure you want to delete this list?"
                      onConfirm={confirm}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="link">
                        <CloseIcon />
                      </Button>
                    </Popconfirm>
                  </div>
                </>
              ) : (
                <form>
                  <TextareaAutosize
                    autoFocus
                    className="list-title-textarea"
                    placeholder={title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && onSubmit(e)}
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
                    <>
                      <div
                        className="list-cards row p-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {list.cards.map((cardId, index) => (
                          <Card
                            key={cardId}
                            cardId={cardId}
                            list={list}
                            index={index}
                          />
                        ))}
                      </div>
                      {provided.placeholder}
                      <AddCard listId={listId} />
                    </>
                  )}
                </Droppable>
              </>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;
