import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAdvertisementById, updateAdvertisement } from '../services/advertisementService';
import Modal from '../../../components/Modal';
import { Advertisement } from '../../../types';

const AdvertisementPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<Advertisement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const loadAdvertisement = async () => {
      try {
        const fetchedAd = await fetchAdvertisementById(id!);
        setAd(fetchedAd);
      } catch (error) {
        console.error('Error fetching ad:', error);
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

  if (!ad) return <p>Загрузка...</p>;

  return (
    <div>
      <h1>{ad.name}</h1>
      <img src={ad.imageUrl} alt={ad.name} />
      <p>{ad.description}</p>
      <p>Цена: ${ad.price}</p>

      <button onClick={() => setIsEditMode(true)}>Редактировать</button>

      {isEditMode && (
        <Modal
          onClose={() => setIsEditMode(false)}
          onSubmit={handleUpdate}
          initialData={ad} // Передаём данные для редактирования
        />
      )}
    </div>
  );
};

export default AdvertisementPage;
