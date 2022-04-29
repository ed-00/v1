import React, { Suspense } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import LoadingSpinner from "./Components/UI/LoadingSpinner/LoadingSpinner";


const Map = React.lazy(() => import("./Components/Map/Map"));
const Home = React.lazy(() => import("./Components/Home/Home"));
function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>

        <Route path="/explore">
          <Map />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
