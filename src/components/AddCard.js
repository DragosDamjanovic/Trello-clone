import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../Redux/Actions/WorkspaceAction";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Button, Popover } from "@mui/material";

const AddCard = ({ listId }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const id = open ? "simple-popover" : undefined;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCard({ title, listId }));
    setTitle("");
  };

  return (
    <>
      <div className="add-card">
        <Button className="open-add-card" onClick={() => setOpen(true)}>
          <AddIcon /> Add another card
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
            label="Enter a title for this card..."
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="add-card-controls">
            <Button type="submit" variant="contained" color="primary">
              Add card
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

export default AddCard;
