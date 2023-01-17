import React, { useState } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../Redux/Actions/WorkspaceAction";
import Avatar from "@mui/material/Avatar";
import { Input, Button } from "antd";
import Comment from "./Comment";

const { TextArea } = Input;

const Activity = ({ card }) => {
  const [comment, setComment] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const Submit = async (e) => {
    e.preventDefault();
    dispatch(addComment(card._id, { comment }));
    setComment("");
  };

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

  return (
    <div className="activity">
      <div className="activity-header">
        <span>
          <FormatListBulletedIcon />
        </span>
        <div className="activity-title">
          <h3>Activity</h3>
        </div>
      </div>
      <div className="new-comment">
        <div className="new-comment-user-avatar">
          <Avatar {...stringAvatar(`${userInfo.name}`)} />
        </div>
        <form>
          <TextArea
            variant="outlined"
            margin="normal"
            required
            autoSize={{ minRows: 2, maxRows: 3 }}
            placeholder="Write a comment..."
            autoFocus
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="primary" onClick={(e) => Submit(e)} className="mt-2">
            Save
          </Button>
        </form>
      </div>
      {!card.activity ? null : (
        <div className="activity-list">
          {card.activity.map((comment) => {
            return <Comment card={card} comment={comment} key={comment._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Activity;
