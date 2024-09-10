import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AllAdvertisementsPage from './pages/AllAdvertisementsPage';
import OrdersPage from './pages/OrdersPage';
import AdvertisementPage from './pages/AdvertisementPage';
import OrderPage from './pages/OrderPage';

function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/advertisements">Advertisements</Link>
                        </li>
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                    </ul>
                </nav>

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
