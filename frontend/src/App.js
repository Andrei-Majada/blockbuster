import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "./pages/Base";
import Fav from "./pages/Fav";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Base />} />
                <Route exact path="/fav" element={<Fav />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
