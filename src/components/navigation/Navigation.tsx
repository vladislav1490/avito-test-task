import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink to="/advertisements" className={({ isActive }) => isActive ? styles.active : ''}>
            Advertisements
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to="/orders" className={({ isActive }) => isActive ? styles.active : ''}>
            Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
