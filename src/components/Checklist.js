import { Button, Progress, Input, Form } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addChecklistItem } from "../Redux/Actions/WorkspaceAction";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ChecklistItem from "./ChecklistItem";

const Checklist = ({ cardId, card }) => {
  const [editing, setEditing] = useState(false);
  let add = 0;

  const dispatch = useDispatch();
  const checklist = card.checklist;

  const onFinish = (value) => {
    const text = value.text;
    dispatch(addChecklistItem(cardId, text));
    setEditing(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleClick = () => {
    setEditing(true);
  };

  let addProc = Math.round(100 / checklist.length);
  checklist.map((item) => {
    if (item.complete === true) {
      return add++;
    }
  });

  const progressProcent = addProc * add;

  return (
    <div className="checklist">
      <div className="checklist-header">
        <span>
          <CheckBoxIcon />
        </span>
        <div className="checklist-title">
          <h3>Checklist</h3>
        </div>
      </div>
      {progressProcent === 99 || progressProcent === 98 ? (
        <Progress percent={100} />
      ) : (
        <Progress percent={progressProcent} />
      )}

      {!checklist ? (
        <div className="checklist-new-item">
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Add an item"
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
      ) : (
        <div className="checklist-items-list">
          {checklist.map((item) => {
            return <ChecklistItem item={item} card={card} key={item._id} />;
          })}
          <div className="checklist-new-item mt-3">
            {!editing ? (
              <button className="checklist-new-item-btn" onClick={handleClick}>
                Add an item
              </button>
            ) : (
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Add an item"
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Checklist;
