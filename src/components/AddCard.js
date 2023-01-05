import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../Redux/Actions/WorkspaceAction";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

const AddCard = ({ listId }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCard({ title, listId }));
    setOpen(false);
    setTitle("");
  };

  return (
    <>
      {!open ? (
        <div className="add-card row">
          <Button className="open-add-card" type="button" onClick={handleClick}>
            <AddIcon /> Add card
          </Button>
        </div>
      ) : (
        <div>
          <form
            onSubmit={(e) => onSubmit(e)}
            className="p-2"
            style={{ width: "272px" }}
          >
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
              <Button type="button" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddCard;
