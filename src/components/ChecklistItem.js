import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  completeChecklistItem,
  deleteChecklistItem,
  editChecklistItem,
} from "../Redux/Actions/WorkspaceAction";
import { Button, Checkbox, Input, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ChecklistItem = ({ item, card }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(item.text);

  const dispatch = useDispatch();
  const onChange = (e) => {
    dispatch(
      completeChecklistItem({
        cardId: card._id,
        complete: e.target.checked,
        itemId: item._id,
      })
    );
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(editChecklistItem(card._id, item._id, text));
    setEditing(false);
  };

  const handleClick = () => {
    setEditing(true);
  };

  const confirm = (e) => {
    console.log(e);
    message.success("The checklist item has been deleted");
    dispatch(deleteChecklistItem(card._id, item._id));
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <div className="checklist-item">
      <div className="checklist-item-checkbox">
        <Checkbox
          checked={
            card.checklist.find((cardItem) => cardItem._id === item._id)
              .complete
          }
          onChange={onChange}
        />
      </div>
      <div className="checklist-item-details">
        {!editing ? (
          <>
            <span className="checklist-item-details-text">{text}</span>
            <div className="checklist-item-controls">
              <span className="checklist-item-controls-btn-delete">
                <Popconfirm
                  title="Delete the checklist item"
                  description="Are you sure you want to delete this checklist item?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <button>
                    <DeleteOutlined />
                  </button>
                </Popconfirm>
              </span>
              <span className="checklist-item-controls-btn-edit">
                <button onClick={handleClick}>
                  <EditOutlined />
                </button>
              </span>
            </div>
          </>
        ) : (
          <form>
            <TextArea
              variant="outlined"
              margin="normal"
              required
              autoSize={{ minRows: 1, maxRows: 4 }}
              placeholder=""
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              type="primary"
              size="small"
              onClick={(e) => onSubmit(e)}
              className="mt-2"
            >
              Save
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChecklistItem;
