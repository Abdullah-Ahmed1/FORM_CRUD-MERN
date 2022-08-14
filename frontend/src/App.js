import "./App.css";
import { Routes, Route, Link } from "react-router-dom";

import Form from "./pages/Form";
import User from "./pages/User";

function App() {
  return (
    <div className="App">
      <h1>Welcome to new App</h1>
      <Routes>
        <Route path="/add" element={<Form />} />
        <Route path="/" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
