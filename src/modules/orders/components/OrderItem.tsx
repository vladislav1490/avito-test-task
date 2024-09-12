import React from 'react';
import { Link } from 'react-router-dom';
import { OrderItem as OrderItemType } from '../../../types';
import styles from '../styles/OrderItem.module.css';

interface OrderItemProps {
  item: OrderItemType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <li className={styles.item}>
      <div className={styles.itemDetails}>
        <p className={styles.itemName}>{item.name} (x{item.count})</p>
        <p className={styles.itemPrice}>Price: {item.price}</p>
      </div>
      <Link to={`/advertisements/${item.id}`} target="_blank" rel="noopener noreferrer" className={styles.adLink}>
        View Advertisement
      </Link>
    </li>
  );
};

export default OrderItem;
