import React from "react";
import { Link } from "react-router-dom";

const DropDown = ({ workspace, workspaces }) => {
  return (
    <div className="dropdown">
      <div
        className="dropdown-toggle d-flex justify-content-between align-items-center"
        id="navbarDarkDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Workspaces
      </div>
      <div className="dropdown-menu">
        <div>
          <div>
            <h2>Current Workspace</h2>
            <div className="cur-workspace-card d-flex flex-row align-items-center">
              <div className="workspaces-section-header-icon">
                <div>T</div>
              </div>
              <p>{workspace.title}</p>
            </div>
            <div className="seperate-line"></div>
            <h2>Your Workspaces</h2>
            <ul>
              {workspaces.map((workspace) => (
                <li className="dropdown-item" key={workspace._id}>
                  <Link
                    to={`/workspaces/${workspace._id}`}
                    className="dropdown-item-link"
                  >
                    <div className="workspaces-section-header-icon">
                      <div>T</div>
                    </div>
                    <p>{workspace.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
