import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../Redux/Actions/WorkspaceAction";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Button, Popover } from "@mui/material";

const AddList = ({ workspaceId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addList({ title, workspaceId }));
    handleClick(e);
    setTitle("");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="add-list col-2">
        <Button
          className="open-add-list"
          aria-describedby={id}
          type="button"
          onClick={handleClick}
        >
          <AddIcon /> Add another list
        </Button>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <form
          onSubmit={(e) => onSubmit(e)}
          className="p-2"
          style={{ width: "284px" }}
        >
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
            <Button aria-describedby={id} type="button" onClick={handleClick}>
              <CloseIcon />
            </Button>
          </div>
        </form>
      </Popover>
    </>
  );
};

export default AddList;
