import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import AllAdvertisementsPage from './modules/advertisements/pages/AllAdvertisementsPage';
import OrdersPage from './modules/orders/pages/OrdersPage';
import AdvertisementPage from './modules/advertisements/pages/AdvertisementPage';
import OrderPage from './modules/orders/pages/OrderPage';
import Navigation from './components/navigation/Navigation';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/advertisements" />} />
          <Route path="/advertisements" element={<AllAdvertisementsPage />} />
          <Route path="/advertisements/:id" element={<AdvertisementPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:id" element={<OrderPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
