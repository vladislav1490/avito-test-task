import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AllAdvertisementsPage from './modules/advertisements/pages/AllAdvertisementsPage';
import OrdersPage from './modules/orders/pages/OrdersPage';
import AdvertisementPage from './modules/advertisements/pages/AdvertisementPage';
import OrderPage from './modules/orders/pages/OrderPage';
import Navigation from './components/Navigation'; // Подключаем навигацию
import './styles/global.css';

function App() {
  return (
    <Router>
      <div>
        <Navigation /> {/* Добавляем панель навигации */}
        <Routes>
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
