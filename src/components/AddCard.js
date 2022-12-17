import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../Redux/Actions/WorkspaceAction";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Button, Popover } from "@mui/material";

const AddCard = ({ listId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCard({ title, listId }));
    handleClick(e);
    setTitle("");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <div className="add-card row">
        <Button
          className="open-add-card"
          aria-describedby={id}
          type="button"
          onClick={handleClick}
        >
          <AddIcon /> Add card
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
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            required
            label="Enter a title for this card..."
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSubmit(e)}
          />
          <div className="add-card-controls">
            <Button type="submit" variant="contained" color="primary">
              Add card
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

export default AddCard;
