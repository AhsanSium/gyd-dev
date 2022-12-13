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
import Appoinment from './Pages/Home/Appoinment/Appoinment';
import Doctors from './Pages/Home/Doctors/Doctors';
import OnlineDocDetails from './Pages/Dentist/Details/OnlineDocDetails';
import OnlineDoctors from './Pages/Home/Doctors/OnlineDoctors';
import OnlineConsultency from './Pages/Home/Appoinment/OnlineConsultancy';
import Hospital from './Pages/Hospital/Hospital';

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
              <Route path='/doctors' element={<Dentist />} />
              <Route path='/hospitals' element={<Hospital />} />
              <Route path='/online-consultancy' element={<OnlineDocDetails />} />
              <Route path='/dashboard'
                element={
                  <PrivateRoute >
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              <Route path='/appointment/:id'
                element={
                  <PrivateRoute >
                    <Appoinment />
                  </PrivateRoute>
                }
              />

              <Route path='/online-consultancy/doctor/:id'
                element={
                  <PrivateRoute >
                    < OnlineConsultency />
                  </PrivateRoute>
                }
              />

              <Route path='/doctors/:id' element={<Doctors />} />
              <Route path='/online-consultancy/:id' element={<OnlineDoctors />} />

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
