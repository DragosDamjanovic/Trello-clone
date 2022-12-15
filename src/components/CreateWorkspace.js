import React, { useState } from "react";
import "./../Styles/components/createWorkspace.scss";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const body = (
    <Box sx={style}>
      <div className="modal-top">
        <div id="modal-modal-title" className="d-flex justify-content-between">
          <Typography variant="h6" component="h2">
            Create new workspace
          </Typography>
          <Button onClick={() => setOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
        <form onSubmit={(e) => onSubmit(e)} id="modal-modal-description">
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
    <li className="workspaces-list-item-add-workspace">
      <Button className="create-workspace" onClick={() => setOpen(true)}>
        Create new workspace
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {body}
      </Modal>
    </li>
  );
};

export default CreateWorkspace;
