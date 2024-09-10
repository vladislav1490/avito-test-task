import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdvertisements} from '../services/api';
import { Advertisement } from '../types';

const AllAdvertisementsPage = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdvertisements().then((data) => {
      setAds(data);
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching ads:', error);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Advertisements</h1>
      <ul>
        {ads.map((ad) => (
          <li key={ad.id}>
            <Link to={`/advertisements/${ad.id}`}>
              <h2>{ad.name}</h2>
              <p>Price: {ad.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllAdvertisementsPage;
