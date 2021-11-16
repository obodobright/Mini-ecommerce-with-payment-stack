import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Product from "../component/product";
import ProductDetail from "../component/productDetails";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Product} />
        <Route path="/productdetail/:id" exact component={ProductDetail} />
      </Switch>
    </Router>
  );
};
