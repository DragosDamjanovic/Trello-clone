import React, { useEffect, useState } from "react";
import "../Styles/components/header.scss";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";
import { getCard } from "../Redux/Actions/WorkspaceAction";
import { Button, Modal } from "antd";
import CardModal from "./CardModal";

const Card = ({ cardId, list, index }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
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

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <div
          className="list-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Button className="card" type="link" onClick={showModal}>
            {title}
          </Button>
          {!description ? null : <DescriptionIcon className="mt-2" />}
          <Modal
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            card={card}
            list={list}
            width="700px"
          >
            <CardModal
              card={card}
              title={title}
              description={description}
              list={list}
              cardId={cardId}
            />
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
