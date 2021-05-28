import React from "react";
import "./App.css";
import Add from "./Add";
import Home from "./table";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Fiscalias() {
  return (
    <div>
      {/* <Router>
        <div style={{ marginTop: "100px", marginLeft: "50px" }}>
          <Link
            className="btn-floating btn-large waves-effect waves-light blue"
            to="/create"
          >
            <i class="material-icons">add</i>{" "}
          </Link>

          <Link to="/"></Link>

          <Switch>
            <Route path="/create">
              <Add />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router> */}
      <br />
      <Typography variant="h3">Fiscalias</Typography>

      <Home />
    </div>
  );
}

export default Fiscalias;
