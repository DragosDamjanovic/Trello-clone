import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
//import getInitials from "../../utils/getInitials";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  TextField,
  Avatar,
  Tooltip,
  Autocomplete,
} from "@mui/material";
import { addMember } from "../Redux/Actions/WorkspaceAction";
import { URL } from "../Redux/Url";

const AddMembersModal = () => {
  const [inviting, setInviting] = useState(false);
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsers] = useState([]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const workspaceMembers = useSelector(
    (state) => state.workspace.workspace.members
  );
  const searchOptions = users.filter((user) =>
    workspaceMembers.find(
      (workspaceMember) => workspaceMember.user === user._id
    )
      ? false
      : true
  );
  const dispatch = useDispatch();

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "https://developer.mozilla.org",
      Vary: "Origin",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const handleInputValue = async (newInputValue) => {
    setInputValue(newInputValue);
    if (newInputValue && newInputValue !== "") {
      const search = (
        await axios.get(`${URL}/api/users/${newInputValue}`, config)
      ).data.slice(0, 5);
      setUsers(search && search.length > 0 ? search : []);
    }
  };

  const onSubmit = async () => {
    dispatch(addMember(user._id));
    setUser(null);
    setInputValue("");
    setInviting(false);
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
    <div className="board-members-wrapper p-4 pt-0">
      <div className="board-members row pb-4 ">
        <h6>Workspace members:</h6>
        {workspaceMembers.map((member) => {
          return (
            <div className="col-2" key={member.user}>
              <Tooltip title={member.name}>
                <Avatar
                  className="avatar"
                  {...stringAvatar(`${member.name}`)}
                />
              </Tooltip>
            </div>
          );
        })}
      </div>
      {!inviting ? (
        <Button
          className="invite"
          variant="contained"
          onClick={() => setInviting(true)}
        >
          Invite
        </Button>
      ) : (
        <div className="invite">
          <Autocomplete
            value={user}
            onChange={(e, newMember) => setUser(newMember)}
            inputValue={inputValue}
            onInputChange={(e, newInputValue) =>
              handleInputValue(newInputValue)
            }
            options={searchOptions}
            getOptionLabel={(member) => member.email}
            className="search-member"
            renderInput={(params) => (
              <TextField
                {...params}
                helperText="Search for user by email"
                autoFocus
              />
            )}
          />
          <div className="add-member">
            <Button
              disabled={!user}
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              Add Member
            </Button>
            <Button onClick={() => setInviting(false)}>
              <CloseIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMembersModal;
