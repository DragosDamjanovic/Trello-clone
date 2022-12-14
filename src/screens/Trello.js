import React, { useEffect } from "react";
import "../Styles/pages/trello.scss";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspace } from "../Redux/Actions/WorkspaceAction";
import { useParams } from "react-router-dom";
import List from "./../components/List";
import AddList from "../components/AddList";

const Trello = () => {
  const dispatch = useDispatch();
  const workspace = useSelector((state) => state.workspace.workspace);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getWorkspace(id));
  }, [dispatch, id]);

  return (
    <>
      <Header />
      <div className="board-canvas">
        <div className="board">
          <div className="lists-wrapper">
            {!workspace.lists ? (
              <AddList />
            ) : (
              <>
                {workspace.lists.map((listId, index) => (
                  <List key={listId} listId={listId} index={index} />
                ))}
                <AddList />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Trello;
