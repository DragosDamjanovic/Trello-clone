import React, { useEffect, useState } from "react";
import "../Styles/components/header.scss";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Popover } from "@mui/material";
import { logout } from "../Redux/Actions/UserAction";
import { Navigate } from "react-router-dom";
import { getWorkspaces } from "../Redux/Actions/WorkspaceAction";
import DropDown from "./DropDown";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const workspaces = useSelector((state) => state.workspace.workspaces);
  const workspace = useSelector((state) => state.workspace.workspace);

  useEffect(() => {
    dispatch(getWorkspaces());
  }, [dispatch]);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(logout());
    handleClick(e);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

  if (!userInfo) {
    return <Navigate to="/" />;
  }

  return (
    <div className="board-header d-flex flex-row justify-content-between">
      <div className="col-4 d-flex flex-row justify-content-start">
        <a href="/" className="trello-logo-link row-1">
          <div className="trello-logo"></div>
        </a>
        <div className="row-3">
          {workspace ? (
            <DropDown workspace={workspace} workspaces={workspaces} />
          ) : null}
        </div>
      </div>

      <div className="board-header-user col-1">
        <div className="board-header-member ">
          <Button
            className="open-add-list"
            aria-describedby={id}
            type="button"
            onClick={handleClick}
          >
            <Avatar {...stringAvatar(`${userInfo.name}`)} />
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="p-3">
              <div className="d-flex justify-content-between mb-3">
                <h4>Account</h4>
                <Button
                  aria-describedby={id}
                  type="button"
                  onClick={handleClick}
                >
                  <CloseIcon />
                </Button>
              </div>
              <form onSubmit={(e) => onSubmit(e)}>
                <nav>
                  <ul>
                    <div className="row d-flex flex-row justify-content-start mb-3">
                      <div className="col-3">
                        <Avatar {...stringAvatar(`${userInfo.name}`)} />
                      </div>
                      <div className="col-9">
                        <div>{userInfo.name}</div>
                        <span>{userInfo.email}</span>
                      </div>
                    </div>
                    <li>
                      <Button type="submit" variant="contained">
                        Log out
                      </Button>
                    </li>
                  </ul>
                </nav>
              </form>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
