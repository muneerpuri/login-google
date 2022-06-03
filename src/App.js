import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
  // Link
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import { useSelector } from "react-redux";

function App() {

  const userReducerData = useSelector((state) => state);
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Home/>} /> */}
        <Route
            exact
            path="/"
            element={userReducerData.user  ? (
                <Home />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          /> 
        <Route exact path="/login" element={<Login/>} />
        <Route path='*' element={<div>Page not found!!</div>} />
      </Routes>
    
    </Router>
  );
}

export default App;
