import {BrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import * as React from "react";
import {AuthProvider} from "./security/AuthProvider";

function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
              <div className="App">
                  <Root/>
              </div>
          </AuthProvider>
      </BrowserRouter>
  );
}


export default App;
