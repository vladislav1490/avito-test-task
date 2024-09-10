import { Order } from '../../../types';

const API_URL = 'http://localhost:3000';

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await fetch(`${API_URL}/orders`);
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  return response.json();
};

export const fetchOrderById = async (id: string): Promise<Order> => {
  const response = await fetch(`${API_URL}/orders/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch order');
  }
  return response.json();
};
