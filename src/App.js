import {BrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import * as React from "react";

function App() {
  return (
          <BrowserRouter>
            <div className="App">
              <Root/>
            </div>
          </BrowserRouter>
  );
}


export default App;
