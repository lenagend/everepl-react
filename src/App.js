import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import WildcardPage from "./pages/WildcardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
          <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="*" element={<WildcardPage/>}/>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/404" element={<NotFoundPage />} />
                </Routes>
            </div>
          </BrowserRouter>
  );
}


export default App;
