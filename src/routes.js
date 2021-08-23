import React from "react";
import { Route } from "react-router-dom";

import Workspace from "./containers/Workspace";
import Portfolio from "./containers/Portfolio";
import BondDetailView from "./containers/BondDetailView";
import BondCreateView from "./containers/BondCreateView";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={Workspace} />
    <Route exact path="/workspace" component={Workspace} />
    <Route exact path="/portfolio" component={Portfolio} />
    <Route exact path="/bond-create" component={BondCreateView} />
    <Route exact path="/bond/:bondID" component={BondDetailView} />
  </div>
);

export default BaseRouter;
