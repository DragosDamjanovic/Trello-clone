import React, { useRef, useEffect, useState } from "react";
import "../Styles/components/header.scss";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { getCard } from "../Redux/Actions/WorkspaceAction";

const Card = ({ cardId, list, index }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
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
    }
  }, [card]);

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
          <div>
            <Typography variant="h6" component="h2">
              Card <strong>{title}</strong> in list{" "}
              <strong>{list.title}</strong>
            </Typography>
            <Button>
              <DeleteIcon />
              Delete card
            </Button>
          </div>
          <Button onClick={() => setOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
        <form id="modal-modal-description">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Add a more detailed description..."
            autoFocus
            value={title}
            //onChange={(e) => setTitle(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Create Workspace
          </Button>
        </form>
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
            cardId={cardId}
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
