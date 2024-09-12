import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderById, completeOrder as completeOrderApi } from '../services/orderService';
import { Order, OrderStatus } from '../../../types';
import styles from '../styles/OrderPage.module.css';
import loaderStyles from '../styles//Loader.module.css';
import OrderItem from '../components/OrderItem'; 

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showItems, setShowItems] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchOrderById(id)
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching order:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleCompleteOrder = async () => {
    try {
      await completeOrderApi(id!);
      setMessage('Order successfully completed.');
      navigate('/orders');
    } catch (error) {
      console.error('Failed to complete order:', error);
      setMessage('Failed to complete the order.');
    }
  };

  if (loading) return (
    <div className={loaderStyles.loader}></div>
  );

  if (!order) return <p>Order not found.</p>;

  const canCompleteOrder = order.status !== OrderStatus.Archived;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order Details</h1>
      <div className={styles.orderDetails}>
        <p>Order ID: {order.id}</p>
        <p>Status: {Object.keys(OrderStatus)[order.status]}</p>
        <p>Total: {order.total}</p>
        <p>Delivery Way: {order.deliveryWay}</p>
        <p>Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
      </div>

      {message && <p className={`${styles.message} ${message.includes('Failed') ? styles.error : ''}`}>{message}</p>}

      {canCompleteOrder && (
        <button className={styles.button} onClick={handleCompleteOrder}>Complete Order</button>
      )}

      <h2>Items</h2>
      <button className={styles.itemsToggle} onClick={() => setShowItems(!showItems)}>
        {showItems ? 'Hide Items' : 'Show All Items'}
      </button>

      {showItems && (
        <ul className={styles.itemsList}>
          {order.items.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderPage;
