import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAdvertisementById, updateAdvertisement } from '../services/advertisementService';
import Modal from '../../../components/modal/Modal';
import { Advertisement } from '../../../types';
import styles from '../styles/AdvertisementPage.module.css';
import loaderStyles from '../styles/Loader.module.css';

const AdvertisementPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdvertisement = async () => {
      try {
        const fetchedAd = await fetchAdvertisementById(id!);
        setAd(fetchedAd);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ad:', error);
        setLoading(false);
      }
    };

    loadAdvertisement();
  }, [id]);

  const handleUpdate = async (updatedAd: Partial<Advertisement>) => {
    if (ad && id) {
      try {
        const newAd = await updateAdvertisement(id, updatedAd);
        setAd(newAd);
        setIsEditMode(false);
      } catch (error) {
        console.error('Error updating ad:', error);
      }
    }
  };

  if (loading) return <div className={loaderStyles.loader}></div>;

  if (!ad) return <p>Advertisement not found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{ad.name}</h1>
      <img src={ad.imageUrl} alt={ad.name} className={styles.image} />
      <p className={styles.description}>{ad.description}</p>
      <p className={styles.price}>Price: ${ad.price}</p>

      <button onClick={() => setIsEditMode(true)} className={styles.editButton}>Edit</button>

      {isEditMode && (
        <Modal
          onClose={() => setIsEditMode(false)}
          onSubmit={handleUpdate}
          initialData={ad}
        />
      )}
    </div>
  );
};

export default AdvertisementPage;
