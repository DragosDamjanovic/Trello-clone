import React, { useEffect, useState } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { useDispatch } from "react-redux";
import { renameList } from "../Redux/Actions/WorkspaceAction";

const ListEditor = ({ list }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameList(list._id, { title }));
    setEditing(false);
  };

  return !editing ? (
    <h3 className="list-title" onClick={() => setEditing(true)}>
      {list.title}
    </h3>
  ) : (
    <form onSubmit={(e) => onSubmit(e)}>
      <TextareaAutosize
        autoFocus
        className="list-title-textarea"
        placeholder={list.title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

export default ListEditor;
