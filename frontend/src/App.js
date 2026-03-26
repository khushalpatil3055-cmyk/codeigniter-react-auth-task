import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Users from './pages/Users';
import Teachers from './pages/Teachers';
import Navbar from './components/Navbar';

function PrivateRoute({ children }) {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"         element={<Navigate to="/login" />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users"    element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route path="/teachers" element={<PrivateRoute><Teachers /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}