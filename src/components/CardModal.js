import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import DescriptionIcon from "@mui/icons-material/Description";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { deleteCard, editCard } from "../Redux/Actions/WorkspaceAction";
import ListItemText from "@mui/material/ListItemText";
import { message, Popconfirm } from "antd";
import { Button } from "antd";

const CardModal = ({ card, title, description, list, cardId }) => {
  const [editing, setEditing] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCard(card._id, { title, description }));
    setEditing(false);
  };

  const confirm = (e) => {
    console.log(e);
    message.success("The card has been deleted");
    dispatch(deleteCard(list._id, cardId));
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <div className="modal-top">
      <div
        id="modal-modal-title"
        className="d-flex justify-content-between mb-3"
      >
        <div className="row d-flex flex-row">
          <span className="col-3 mt-1">
            <VideoLabelIcon />
          </span>
          <div className="col-9">
            <Typography variant="h6" component="h2">
              <strong>{title}</strong>
            </Typography>
            <Typography variant="span" component="h6">
              in list <strong>{list.title}</strong>
            </Typography>
          </div>
        </div>
      </div>
      <div id="modal-modal-description">
        <div className="row d-flex flex-row">
          <span className="col-1">
            <DescriptionIcon className="mt-1" />
          </span>
          <div className="col-10">
            <Typography variant="h6" component="h2">
              <strong>Description</strong>
            </Typography>
            {!editing ? (
              <div className="row">
                <div className="col-8">
                  <ListItemText>{description}</ListItemText>
                  <Button onClick={setEditing(true)}>Edit</Button>
                </div>
              </div>
            ) : (
              <form>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Add a more detailed description..."
                  autoFocus
                  multiline
                  value={description}
                />
                <Button type="primary" onClick={(e) => onSubmit(e)}>
                  Save
                </Button>
              </form>
            )}
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-1"></div>
          <div className="col-11">
            <Popconfirm
              title="Delete the card"
              description="Are you sure you want to delete this card?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                <DeleteIcon />
                Delete card
              </Button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
