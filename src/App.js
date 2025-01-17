import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { UserProvider } from './pages/UserContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Landing from './pages/Landing';
import Nopage from './pages/Nopage';
import Profile from './pages/Profile';
function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route  path="/main" element={<Main />} />
            <Route path='/profile' element={<Profile />} />
            <Route path="*" element={<Nopage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}
export default App;
