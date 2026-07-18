import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

function App() {
  return (
    <div className="ls-page">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Dashboard route will go here later */}
        <Route
          path="/"
          element={
            <div className="p-10 text-center">Dashboard (Coming Soon)</div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
