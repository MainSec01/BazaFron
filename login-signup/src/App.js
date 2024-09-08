import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./Components/LoginSignup/Login";
import { Register } from "./Components/LoginSignup/Register";
import { Home } from "./Components/Home/Home";
import SecurePage from "./Components/SecurePage/SecurePage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<Home />} path="/" exact />
          <Route element={<SecurePage />} path="/SecurePage" exact />
        </Routes>
      </Router>
      {/* <LoginSignup/> */}
    </div>
  );
}

export default App;
