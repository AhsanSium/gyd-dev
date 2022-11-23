import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './Context/AuthProvider';
import About from './Pages/About/About/About';
import Approved from './Pages/Approved/Approved';
import Contact from './Pages/Contact/Contact/Contact';
import Dentist from './Pages/Dentist/Denitst/Dentist';
import Footer from './Pages/Home/Footer/Footer.jsx';
import Header from './Pages/Home/Header/Header.jsx';
import Home from './Pages/Home/Home/Home.jsx';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Service from './Pages/Services/Service/Service';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Dashboard from './Pages/Dashboard/Dashboard';
import PrivateRoute from './Pages/Login/PrivateRoute';

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER
};

function App() {
  return (
    <div className="App">

      <Provider template={AlertTemplate} {...options}>
        <AuthProvider>
          <Router>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/service' element={<Service />} />
              <Route path='/dentist' element={<Dentist />} />
              <Route path='/dashboard'
                element={
                  <PrivateRoute >
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route path='/contact' element={<Contact />} />
              <Route path='/approved' element={<Approved />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
      </Provider>
    </div>
  );
}

export default App;
