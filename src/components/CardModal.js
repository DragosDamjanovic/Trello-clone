import React, { useState } from "react";
import "../Styles/components/cardModal.scss";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import DescriptionIcon from "@mui/icons-material/Description";
import Popover from "@mui/material/Popover";
import { useDispatch } from "react-redux";
import {
  addChecklistItem,
  deleteCard,
  editCard,
} from "../Redux/Actions/WorkspaceAction";
import { message, Popconfirm, Button, Form, Input } from "antd";
import {
  UserOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Checklist from "./Checklist";
import Activity from "./Activity";

const { TextArea } = Input;

const CardModal = ({ card, title, description, list, cardId }) => {
  const [editing, setEditing] = useState(true);

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

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const onFinish = (value) => {
    const text = value.text;
    dispatch(addChecklistItem(cardId, text));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="modal-top">
      <div id="modal-modal-title" className=" mb-3">
        <div className="row d-flex flex-row card-title">
          <span className="col-1 mt-1">
            <VideoLabelIcon />
          </span>
          <div className="col-11 card-name">
            <h2>
              <strong>{title}</strong>
            </h2>
            <p className="mb-0">
              in list <strong>{list.title}</strong>
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-9">
          <div id="modal-modal-description">
            <div className="row d-flex align-items-center">
              <span className="col-1 mb-2 desc-icon">
                <DescriptionIcon className="mt-1" />
              </span>
              <h3>Description</h3>
              {!editing ? (
                <div>
                  <Button onClick={setEditing(true)}>Edit</Button>
                </div>
              ) : null}
            </div>
            <div className="col desc-cont">
              {!editing ? (
                <div className="row">
                  <p>{description}</p>
                </div>
              ) : (
                <form>
                  <TextArea
                    variant="outlined"
                    margin="normal"
                    required
                    autoSize={{ minRows: 3, maxRows: 5 }}
                    placeholder="Add a more detailed description..."
                    autoFocus
                    value={description}
                  />
                  <Button
                    type="primary"
                    onClick={(e) => onSubmit(e)}
                    className="mt-2"
                  >
                    Save
                  </Button>
                </form>
              )}
            </div>
          </div>
          <Checklist cardId={cardId} card={card} />
          <Activity card={card} />
        </div>
        <div className="col-3">
          <div className="modal-sidebar">
            <h3>Add to card</h3>
            <div>
              <button>
                <UserOutlined className="btn-icon" />
                <span>Members</span>
              </button>
              <div>
                <button
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                >
                  <CheckSquareOutlined className="btn-icon" />
                  <span>Checklist</span>
                </button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  className="checklist-popover"
                >
                  <div className="p-4 pb-0">
                    <div className="mb-2 d-flex align-items-center justify-content-center">
                      <div className="checklist-popover-header">
                        <span>
                          <strong>Add checklist</strong>
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="checklist-popover-content">
                        <Form
                          name="basic"
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="text"
                            name="text"
                            rules={[
                              {
                                required: true,
                                message: "Please input your checklist title!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>

                          <Form.Item>
                            <Button type="primary" htmlType="submit">
                              Add
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  </div>
                </Popover>
              </div>
              <Popconfirm
                title="Delete the card"
                description="Are you sure you want to delete this card?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button>
                  <DeleteOutlined className="btn-icon" />
                  <span>Delete card</span>
                </button>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
