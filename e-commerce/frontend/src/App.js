import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './components/home';
import About from './components/About';
import Create from './components/Create';
import NavBar from './components/NavBar';
import Register from './components/forms/Register';
import Login from './components/forms/Login';
import Logout from './components/forms/Logout';

function App() {
  const myWidth = 210
  return (
    <div className="App">
      <NavBar 
          drawerWidth={myWidth}
          content = {

            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/create" element={<Create/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/logout" element={<Logout/>}/>
            </Routes>

          }
      
      />
      
    </div>
  );
}

export default App;
