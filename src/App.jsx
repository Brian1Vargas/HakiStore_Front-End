
import './App.css'
import Home from './Pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PayPalReturnHandler from '../src/Components/PayPalReturnHandler'; // Asegúrate de que la ruta sea correcta


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/paypal-return" element={<PayPalReturnHandler />} />
               
            </Routes>
        </Router>
    );
}

export default App;
