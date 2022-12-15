import React, { useRef, useEffect } from "react";
import "../Styles/pages/trello.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import {
  getWorkspace,
  moveCard,
  moveList,
} from "../Redux/Actions/WorkspaceAction";
import { useParams } from "react-router-dom";
import List from "./../components/List";
import AddList from "../components/AddList";

const Trello = () => {
  const dispatch = useDispatch();
  const workspace = useSelector((state) => state.workspace.workspace);
  const { id } = useParams();
  console.log(workspace);

  useEffect(() => {
    dispatch(getWorkspace(id));
  }, [dispatch, id]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === "card") {
      dispatch(
        moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(moveList(draggableId, { toIndex: destination.index }));
    }
  };

  return (
    <>
      <Header />
      <div className="board-canvas">
        <div className="board row mx-3 mt-2">
          {!workspace ? (
            <AddList workspaceId={id} />
          ) : (
            <>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                  droppableId="all-lists"
                  direction="horizontal"
                  type="list"
                >
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      {workspace.lists.map((listId, index) => (
                        <Draggable draggableId={listId} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              <div className="lists-wrapper col-2">
                                <List
                                  key={listId}
                                  listId={listId}
                                  index={index}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <AddList workspaceId={id} />
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          )}
        </div>
      </div>
    </>
  );
};

List.propTypes = {
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Trello;
