import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrders } from '../services/orderService';
import { Order, OrderStatus } from '../../../types';
import styles from '../styles/OrdersPage.module.css';
import loaderStyles from '../styles/Loader.module.css';

const getStatusText = (status: number) => {
  return Object.keys(OrderStatus).find(key => OrderStatus[key as keyof typeof OrderStatus] === status) || 'Unknown';
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'total' | 'date'>('date');

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  if (loading) return (
    <div className={loaderStyles.loader}></div>
  );

  const filteredOrders = statusFilter !== null
    ? orders.filter(order => order.status === statusFilter)
    : orders;

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'total') {
      return b.total - a.total;
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orders</h1>

      <div className={styles.filters}>
        <label>
          Filter by Status:
          <select onChange={(e) => setStatusFilter(Number(e.target.value) || null)}>
            <option value="">All</option>
            {Object.entries(OrderStatus).map(([key, value]) => (
              <option key={key} value={value}>{key}</option>
            ))}
          </select>
        </label>

        <label>
          Sort by:
          <select onChange={(e) => setSortBy(e.target.value as 'total' | 'date')}>
            <option value="date">Date</option>
            <option value="total">Total</option>
          </select>
        </label>
      </div>

      <ul className={styles.orderList}>
        {sortedOrders.map((order) => (
          <li key={order.id} className={styles.order}>
            <Link to={`/orders/${order.id}`} className={styles.link}>
              <h2>Order ID: {order.id}</h2>
              <p>Status: {getStatusText(order.status)}</p>
              <p>Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total: {order.total}</p>
              <p>Items: {order.items.length}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
