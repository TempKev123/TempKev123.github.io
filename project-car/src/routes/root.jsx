import { Outlet } from "react-router-dom";

export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Kevin +Sav's car project</h1>
          <nav>
            <ul>
              <li>
                <a href={`/dashboard`}>Dashboard</a>
              </li>
              <li>
                <a href={`/highlight`}>Highlight</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"><Outlet /></div>
      </>
    );
  }