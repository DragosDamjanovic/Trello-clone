import React, { useState } from "react";
import { Popconfirm, message, Button, Input } from "antd";
import Avatar from "@mui/material/Avatar";
import { deleteComment, editComment } from "../Redux/Actions/WorkspaceAction";
import { useDispatch } from "react-redux";

const { TextArea } = Input;

const Comment = ({ comment, card }) => {
  const [newComment, setNewComment] = useState("");
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(editComment(card._id, comment._id, newComment));
    setEditing(false);
  };

  const handleClick = () => {
    setEditing(true);
  };

  const confirm = (e) => {
    console.log(e);
    message.success("The comment has been deleted");
    dispatch(deleteComment(card._id, comment._id));
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <div className="comment" key={comment._id}>
      <div className="comment-creator">
        <Avatar {...stringAvatar(`${comment.name}`)} />
      </div>
      <div className="comment-description">
        <span>{comment.name}</span>

        {!editing ? (
          <div className="comment-container">
            <div className="current-comment">
              <p>{comment.comment}</p>
            </div>
          </div>
        ) : (
          <form>
            <TextArea
              variant="outlined"
              margin="normal"
              required
              autoSize={{ minRows: 1, maxRows: 4 }}
              placeholder=""
              autoFocus
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
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
      {!editing ? (
        <div className="comment-options">
          <button
          //onClick={handleClick}
          >
            Edit
          </button>
          <Popconfirm
            title="Delete the comment"
            description="Are you sure you want to delete this comment?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <button>Delete</button>
          </Popconfirm>
        </div>
      ) : null}
    </div>
  );
};

export default Comment;
