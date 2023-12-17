import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Appbar from "./components/menu/Appbar";
import ViewPageBottomNavigation from "./components/menu/ViewPageBottomNavigation";
import ViewPage from "./pages/ViewPage";
import FloatingButtonBottomNavigation from "./components/menu/FloatingButtonBottomNavigation";
import Box from "@mui/material/Box";

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
                        <Route path="/view" element={<ViewPage />} />
                    </Routes>
                </Box>
                <FloatingButtonBottomNavigation/>
            </div>
          </BrowserRouter>
  );
}

export default App;
