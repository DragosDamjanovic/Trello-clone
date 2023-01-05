import React, { useEffect } from "react";
import "../Styles/pages/dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateWorkspace from "../components/CreateWorkspace";
import Header from "../components/Header";
import { getWorkspaces } from "../Redux/Actions/WorkspaceAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspace.workspaces);

  useEffect(() => {
    dispatch(getWorkspaces());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <Header />
      <section className="dashboard container">
        <h3 className="dashboard-header">Your Workspaces</h3>
        <div className="workspaces-section">
          <div className="workspaces-section-header d-flex">
            <div className="workspaces-section-header-icon">
              <div className="workspaces-section-header-icon-default-image">
                <div>T</div>
              </div>
            </div>
            <h3>Trello Workspace</h3>
          </div>
          <div>
            <ul className="workspaces-list d-flex justify-content-start">
              {!workspaces ? (
                <CreateWorkspace />
              ) : (
                <>
                  {workspaces.map((workspace) => (
                    <li className="workspaces-list-item" key={workspace._id}>
                      <Link
                        to={`/workspaces/${workspace._id}`}
                        className="workspace-card"
                      >
                        <div className="workspace-title">
                          <div className="workspace-title-details">
                            {workspace.title}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                  <CreateWorkspace />
                </>
              )}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
