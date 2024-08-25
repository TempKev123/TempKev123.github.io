import React from "react";
import ReactDOM from "react-dom";
import {HashRouter as Router} from "react-router-dom";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById('root')).render(
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  )
);