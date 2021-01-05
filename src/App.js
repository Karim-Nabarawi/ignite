import React from "react";
import { Route } from "react-router-dom";

//Styles
import GlobalStyles from "./components/GlobalStyles";

//Components and pages
import Home from "./pages/Home";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <Nav />
      <Route path={["/", "/game/:id"]}>
        <Home />
      </Route>
    </div>
  );
}

export default App;
