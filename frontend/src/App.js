import "./App.css";
import Create from "./components/Create";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Read from "./components/Read";
import Update from "./components/Update";
function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Create />} />
            <Route exact path="/all" element={<Read />} />
            <Route path="/:id" element={<Update />} />
            {/* <Route exact path="/Delete" element={<Delete />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
