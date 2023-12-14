import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Appbar from "./components/menu/Appbar";
import FixedBottomNavigation from "./components/menu/FixedBottomNavigation";

function App() {
  return (
          <BrowserRouter>
            <div className="App">
                <Appbar />
                    <Routes>
                    <Route path="/" element={<HomePage />} />
                    </Routes>
                <FixedBottomNavigation/>
            </div>
          </BrowserRouter>
  );
}

export default App;
