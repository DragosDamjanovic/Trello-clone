import React, { useEffect, useState } from "react";
import "../Styles/pages/trello.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
import Sidebar from "../components/Sidebar";
import { RightOutlined } from "@ant-design/icons";
import Offcanvas from "react-bootstrap/Offcanvas";

const Trello = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const workspace = useSelector((state) => state.workspace.workspace);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getWorkspace(id));
  }, [dispatch, id]);

  const onDragEnd = (result) => {
    // Extract properties from result object
    const { source, destination, draggableId, type } = result;

    // Return early if no destination is provided
    if (!destination) {
      return;
    }

    // Dispatch action based on type
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
      <div>
        <div className="sidebar">
          <button onClick={handleShow}>
            <RightOutlined />
          </button>
          <Offcanvas
            show={show}
            onHide={handleClose}
            style={{ width: "300px" }}
          >
            <Sidebar />
          </Offcanvas>
        </div>
        <div className="board-canvas">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="all-lists"
              direction="horizontal"
              type="list"
            >
              {(provided) => (
                <div
                  className="board mx-3 mt-3"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {!workspace ? (
                    <AddList workspaceId={id} />
                  ) : (
                    <>
                      {workspace.lists.map((listId, index) => (
                        <List key={listId} listId={listId} index={index} />
                      ))}
                      {provided.placeholder}
                      <AddList workspaceId={id} />
                    </>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </>
  );
};

export default Trello;
