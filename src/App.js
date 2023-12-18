import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Appbar from "./components/menu/Appbar";
import TextAreaBottomNavigation from "./components/menu/TextAreaBottomNavigation";
import CommentPage from "./pages/CommentPage";
import FloatingButtonBottomNavigation from "./components/menu/FloatingButtonBottomNavigation";
import Box from "@mui/material/Box";
import UserCard from "./components/user/UserCard";

function App() {
  return (
          <BrowserRouter>
            <div className="App">
                <Appbar />
                <Box sx={{pt: {
                          xs: 7,
                          sm: 11
                         },
                         pb: {
                            xs:7
                         }
                }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/comment" element={<CommentPage />} />
                    </Routes>
                </Box>
                <FloatingButtonBottomNavigation/>
            </div>
          </BrowserRouter>
  );
}

export default App;
