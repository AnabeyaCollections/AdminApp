import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AllProducts from './Components/AllProducts';
import Upload from './Components/Upload';
import Orders from './Components/Order';
import Alert from './Components/Alert'
import Auth from './Components/Auth'

const App = () => {
  
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
    return(
        
        <>
        <Router>
            <Navbar/>
            <Alert alert={alert}/>
            <Routes>
                <Route path="/" element={<AllProducts showAlert={showAlert}/>} />
                <Route path="/upload" element={<Upload showAlert={showAlert}/>} />
                <Route path="/orders" element={<Orders showAlert={showAlert}/>} />
                <Route path="/auth" element={<Auth showAlert={showAlert}/>} />

            </Routes>
        </Router>
    </>
    );
};

export default App;
