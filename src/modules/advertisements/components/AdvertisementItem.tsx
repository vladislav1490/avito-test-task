import { Link } from 'react-router-dom';
import { Advertisement } from '../../../types';

interface Props {
  advertisement: Advertisement;
}

const AdvertisementItem: React.FC<Props> = ({ advertisement }) => {
  return (
    <div>
      <h2>{advertisement.name}</h2>
      <p>Price: {advertisement.price}</p>
      <Link to={`/advertisements/${advertisement.id}`}>View Details</Link>
    </div>
  );
};

export default AdvertisementItem;
