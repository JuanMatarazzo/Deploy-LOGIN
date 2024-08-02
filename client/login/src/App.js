import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Componentes/Login/Login";
import CreateUser from "./Componentes/CreateUser/CreateUser";
import Home from "./Componentes/Home/Home";
import DashBoradAdmin from "./Componentes/Admin/DashBoradAdmin.jsx";
import ProtectedRoute from "./Componentes/ProtectedRoute/ProtectedRoute.jsx";
import AdminUser from "./Componentes/UserAdmin/AdminUser";
import axios from 'axios'

axios.defaults.baseURL = 'https://deploy-login-production.up.railway.app/';
function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/create-user" element={<CreateUser />} />
        <Route
          exact
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route exact path="/admin" element={<DashBoradAdmin />} />

        <Route exact path="/admin/user/detail/:id" element={<AdminUser />} />
      </Routes>
  );
}

export default App;
