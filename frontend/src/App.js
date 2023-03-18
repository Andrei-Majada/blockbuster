import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "./pages/Base";
import Favoritos from "./pages/Favoritos";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Base />} />
                <Route exact path="/favoritos" element={<Favoritos />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
