import React, { useState } from "react";
import "./../Styles/components/createWorkspace.scss";
import TextField from "@mui/material/TextField";
import { Button, Modal } from "antd";
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
    setOpen(false);
  };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const body = (
    <div className="modal-top">
      <div className="d-flex justify-content-between">
        <Typography variant="h6" component="h2">
          Create new workspace
        </Typography>
      </div>
      <form>
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
        <Button type="primary" onClick={(e) => onSubmit(e)}>
          Create Workspace
        </Button>
      </form>
    </div>
  );

  return (
    <li className="workspaces-list-item-add-workspace">
      <Button className="create-workspace" onClick={showModal}>
        Create new workspace
      </Button>
      <Modal open={open} onOk={handleOk} onCancel={handleCancel}>
        {body}
      </Modal>
    </li>
  );
};

export default CreateWorkspace;
