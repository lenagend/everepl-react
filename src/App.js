import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Appbar from "./components/menu/Appbar";
import CommentPage from "./pages/CommentPage";
import FloatingButtonBottomNavigation from "./components/menu/FloatingButtonBottomNavigation";
import Box from "@mui/material/Box";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
          <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/comment" element={<CommentPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </div>
          </BrowserRouter>
  );
}

export default App;
