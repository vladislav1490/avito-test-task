import { Link } from 'react-router-dom';
import { Advertisement } from '../../../types';
import styles from '../styles/AdvertisementItem.module.css';
import likeIcon from '../../../assets/icons/like.svg';

interface Props {
  advertisement: Advertisement;
}

const AdvertisementItem: React.FC<Props> = ({ advertisement }) => {
  return (
    <div className={styles.advertisementItem}>
      <Link to={`/advertisements/${advertisement.id}`} className={styles.advertisementLink}>
        <img src={advertisement.imageUrl} alt={advertisement.name} className={styles.adImage} />
        <h2 className={styles.advertisementTitle}>{advertisement.name}</h2>
        <p className={styles.advertisementPrice}>Price: ${advertisement.price}</p>
        <p className={styles.adViews}>Views: {advertisement.views}</p>
        <div className={styles.adLikes}>
        <img src={likeIcon} alt="Likes" className={styles.likeIcon} />
        <span>{advertisement.likes}</span>
        </div>
      </Link>
    </div>
  );
};

export default AdvertisementItem;

