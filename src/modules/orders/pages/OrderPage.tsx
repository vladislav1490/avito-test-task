import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrderById } from '../services/orderService';
import { Order } from '../../../types';

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchOrderById(id)
        .then((data) => {
          setOrder(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching order:', error);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!order) return <p>Order not found.</p>;

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order.id}</p>
      <p>Status: {order.status}</p>
      <p>Total: {order.total}</p>
      <p>Delivery Way: {order.deliveryWay}</p>
      <h2>Items</h2>
      <ul>
        {order.items.map((item) => (
          <li key={item.id}>
            <p>{item.name} (x{item.count}) - {item.price} each</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderPage;
