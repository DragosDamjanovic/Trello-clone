import React, { useEffect } from "react";
import "../Styles/components/sidebar.scss";
import {
  UserOutlined,
  LeftOutlined,
  ProjectOutlined,
  PlusOutlined,
  DownOutlined,
  SettingOutlined,
  TableOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaces } from "../Redux/Actions/WorkspaceAction";

const Sidebar = () => {
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspace.workspaces);

  useEffect(() => {
    dispatch(getWorkspaces());
  }, [dispatch]);

  return (
    <Offcanvas.Body>
      <Offcanvas.Header closeButton>
        <div className="d-flex align-items-center" style={{ width: "170px" }}>
          <div className="col-4">
            <div className="workspaces-section-icon">
              <div>T</div>
            </div>
          </div>
          <div className="col-8 workspaces-section-title">
            <span className="row">Trello Workspace</span>
          </div>
        </div>
      </Offcanvas.Header>

      <div className="row sidebar-menu">
        <div className="col">
          <div className="row sidebar-menu-main">
            <Link
              to="workspaces"
              className="item-link d-flex flex-row align-items-center"
            >
              <ProjectOutlined />
              <p>Boards</p>
            </Link>
            <Link
              to="/"
              className="item-link  d-flex flex-row align-items-center"
            >
              <UserOutlined />
              <p>Members</p>
              <button>
                <PlusOutlined />
              </button>
            </Link>
            <button className="item-button d-flex">
              <SettingOutlined className="item-button-icon" />
              <span className="item-button-text">Settings</span>
              <DownOutlined className="item-button-icon-toggle" />
            </button>
          </div>
          <div className="row sidebar-menu-workspace-views">
            <div className="row sidebar-menu-workspace-views-title">
              <h2>Workspace views</h2>
            </div>
            <ul>
              <div className="workspace-views-list">
                <li className="item">
                  <div className="item-icon">
                    <TableOutlined />
                  </div>
                  <Link to="/" className="item-link">
                    Table
                  </Link>
                </li>
                <li className="item">
                  <div className="item-icon">
                    <CalendarOutlined />
                  </div>
                  <Link to="/" className="item-link">
                    Calendar
                  </Link>
                </li>
              </div>
            </ul>
          </div>
          <div className="row sidebar-menu-boards">
            <div className="row sidebar-menu-boards-title">
              <h2 className="col">Your boards</h2>
              <div className="col-2">
                <button>
                  <PlusOutlined />
                </button>
              </div>
            </div>
            <ul>
              {workspaces.map((workspace) => (
                <li className="item" key={workspace._id}>
                  <div className="workspaces-section-container">
                    <div className="workspaces-section-wrapper">
                      <div className="workspaces-section-image"></div>
                    </div>
                  </div>
                  <Link
                    to={`/workspaces/${workspace._id}`}
                    className="item-link"
                  >
                    {workspace.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Offcanvas.Body>
  );
};

export default Sidebar;
