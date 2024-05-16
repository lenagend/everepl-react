import {BrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import * as React from "react";
import {AuthProvider} from "./security/AuthProvider";
import {SnackbarProvider} from "./contexts/SnackbarProvider";

function App() {
  return (
      <BrowserRouter>
          <AuthProvider>
              <SnackbarProvider>
                  <div className="App">
                      <Root/>
                  </div>
              </SnackbarProvider>
          </AuthProvider>
      </BrowserRouter>
  );
}


export default App;
