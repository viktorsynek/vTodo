import './css/main.css';
import PageNotFound from './components/404';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/Password';
import {Route, Routes, useNavigate} from 'react-router-dom';
import React from 'react';

function RedirectToRegister() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate('/register');
  }, [navigate]);

  return null;
}

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<RedirectToRegister/>}></Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/pw" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
