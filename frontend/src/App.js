import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Form from "./pages/Form";
import User from "./pages/User";

function App() {
  let navigate = useNavigate();
  const [data, setData] = useState({ nodata: true });

  const handleUpdate = (data) => {
    setData(data);
    navigate("/add");
  };
  return (
    <div className="App">
      <h1>Welcome to new App</h1>
      <Routes>
        <Route path="/add" element={<Form data={data} />} />
        <Route path="/" element={<User handleUpdate={handleUpdate} />} />
      </Routes>
    </div>
  );
}

export default App;
