import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css';
import NewHome from './pages/NewHome';
import Login from './pages/Login'
import NavBar from './components/NavBar'
import CheckoutPage from './pages/CheckOutPage';
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); 

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/login' element={ <Login />}  />
        <Route path='/' element={isAuthenticated ? <NewHome /> : <Navigate to="/login" />} /> 
        <Route path="/checkout" element={isAuthenticated ? <CheckoutPage /> : <Navigate to="/login" /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
