import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../Redux/Actions/WorkspaceAction";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Button, Popover } from "@mui/material";

const AddList = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const id = open ? "simple-popover" : undefined;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addList({ title }));
    setTitle("");
  };

  return (
    <>
      <div className="add-list">
        <Button className="open-add-list" onClick={() => setOpen(true)}>
          <AddIcon /> Add another list
        </Button>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            required
            label="Enter list title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="add-list-controls">
            <Button type="submit" variant="contained" color="primary">
              Add list
            </Button>
            <Button onClick={() => setOpen(false)}>
              <CloseIcon />
            </Button>
          </div>
        </form>
      </Popover>
    </>
  );
};

export default AddList;
