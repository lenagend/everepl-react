import {BrowserRouter, Route, Routes} from "react-router-dom";
import WildcardPage from "./pages/WildcardPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import * as React from "react";

function App() {
  return (
          <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="*" element={<WildcardPage/>}/>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/404" element={<NotFoundPage />} />
                </Routes>
            </div>
          </BrowserRouter>
  );
}


export default App;
