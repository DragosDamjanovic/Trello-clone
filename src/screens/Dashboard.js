import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateWorkspace from "../components/CreateWorkspace";
import Header from "../components/Header";
import { getWorkspaces } from "../Redux/Actions/WorkspaceAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspace.workspaces);
  const user = useSelector((state) => state.userDetails);
  //console.log(getWorkspaces());

  useEffect(() => {
    dispatch(getWorkspaces());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <Header />
      <section className="dashboard">
        <h1>Welcome {user.name}</h1>
        <h2>Your Workspaces</h2>
        <div className="workspaces-section">
          <div className="workspaces-section-header">
            <div className="workspaces-section-header-icon">
              <img src="trello-clone\public\trello-v2.svg" alt="TrelloImg" />
            </div>
            <h3>Trello Workspace</h3>
          </div>
          <ul className="workspaces-list d-flex justify-content-start">
            {!workspaces ? (
              <CreateWorkspace />
            ) : (
              <>
                {workspaces.map((workspace) => (
                  <li className="workspaces-list-item">
                    <Link
                      to={`/workspace/${workspace._id}`}
                      key={workspace._id}
                      className="workspace-card"
                    >
                      {workspace.title}
                    </Link>
                  </li>
                ))}
                <CreateWorkspace />
              </>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
