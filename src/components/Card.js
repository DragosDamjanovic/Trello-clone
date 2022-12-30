import React, { useEffect, useState } from "react";
import "../Styles/components/header.scss";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import DescriptionIcon from "@mui/icons-material/Description";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCard,
  editCard,
  getCard,
} from "../Redux/Actions/WorkspaceAction";
import ListItemText from "@mui/material/ListItemText";

const Card = ({ cardId, list, index }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const card = useSelector((state) =>
    state.workspace.workspace.cardObjects.find(
      (object) => object._id === cardId
    )
  );

  useEffect(() => {
    dispatch(getCard(cardId));
  }, [cardId, dispatch]);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setDescription(card.description);
    }
  }, [card]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCard(card._id, { title, description }));
    setEditing(false);
  };

  const deleteCardHandler = async (e) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (confirm) {
      dispatch(deleteCard(list._id, cardId));
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const body = (
    <Box sx={style}>
      <div className="modal-top">
        <div
          id="modal-modal-title"
          className="d-flex justify-content-between mb-3"
        >
          <div className="row d-flex flex-row">
            <span className="col-3">
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
          <Button onClick={() => setOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
        <div id="modal-modal-description">
          <div className="row d-flex flex-row">
            <span className="col-1">
              <DescriptionIcon />
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
                <form onSubmit={(e) => onSubmit(e)}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Add a more detailed description..."
                    autoFocus
                    multiline
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </form>
              )}
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-1"></div>
            <div className="col-11">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  deleteCardHandler(list._id, cardId);
                  setOpen(false);
                }}
              >
                <DeleteIcon />
                Delete card
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <div
          className="list-card text-center"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Button className="card" onClick={() => setOpen(true)}>
            {title}
          </Button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            card={card}
            list={list}
          >
            {body}
          </Modal>
        </div>
      )}
    </Draggable>
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
