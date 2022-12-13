import React, { useEffect } from "react";
import Header from "../components/Header";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspace } from "../Redux/Actions/WorkspaceAction";
import List from "./../components/List";
import AddList from "../components/AddList";

const Trello = ({ match }) => {
  const dispatch = useDispatch();
  const workspace = useSelector((state) => state.workspace.workspace);
  console.log(workspace);

  useEffect(() => {
    dispatch(getWorkspace(workspace._id));
  }, [dispatch, workspace._id]);

  return (
    <>
      <Header />
      <div className="board-canvas">
        <div className="board">
          <div className="lists">
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
