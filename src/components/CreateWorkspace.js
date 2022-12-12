import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { addWorkspace } from "../Redux/Actions/WorkspaceAction";

const CreateWorkspace = ({ history }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addWorkspace({ title }, history));
  };

  const body = (
    <Box>
      <div className="modal-top">
        <h1>Create nw workspace</h1>
        <Button onClick={() => setOpen(false)}>
          <CloseIcon />
        </Button>
        <form onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Add workspace title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Create Workspace
          </Button>
        </form>
      </div>
    </Box>
  );

  return (
    <li>
      <Button className="create-workspace" onClick={() => setOpen(true)}>
        Create new workspace
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        {body}
      </Modal>
    </li>
  );
};

export default CreateWorkspace;
