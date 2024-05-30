import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import About from './components/About/About';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Locations from './components/Location/Locations';
import Starred from './components/Starred/Starred';
import Error from './components/Error/Error';
import './App.css'

function App() {
  
  return (
    <div className='App.css'>
      <main>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/locations/:address" element={<Locations />} />
            <Route path="/starred" element={<Starred />} />
            <Route path="/error" element={<Error />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </Router>
      </main>
    </div>
  )
}

export default App
