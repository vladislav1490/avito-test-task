import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdvertisements } from '../services/advertisementService';
import { Advertisement } from '../../../types';
import Pagination from '../../../components/Pagination';
import Modal from '../../../components/Modal';
import styles from '../styles/AllAdvertisementsPage.module.css';

const AllAdvertisementsPage = () => {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [filteredAds, setFilteredAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadAdvertisements = async () => {
      try {
        const data = await fetchAdvertisements();
        setAds(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading ads:', error);
      }
    };
    loadAdvertisements();
  }, []);

  const handleNewAd = (newAd: Advertisement) => {
    setAds((prevAds) => [...prevAds, newAd]);
  };

  const handleSubmit = (ad: Partial<Advertisement>) => {
    console.log("Form submitted with data:", ad);
  };

  useEffect(() => {
    const filtered = ads.filter((ad) =>
      ad.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAds(filtered);
    setCurrentPage(1);
  }, [searchTerm, ads]);

  if (loading) return <p>Загрузка...</p>;

  const indexOfLastAd = currentPage * itemsPerPage;
  const indexOfFirstAd = indexOfLastAd - itemsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div className={styles.advertisementsContainer}>
      <h1>Объявления</h1>

      <input
        type="text"
        placeholder="Поиск по названию"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.itemsPerPage}>
        <label htmlFor="items-per-page">Показать: </label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <ul className={styles.adsList}>
        {currentAds.map((ad) => (
          <li key={ad.id} className={styles.adItem}>
            <Link to={`/advertisements/${ad.id}`}>
              <img src={ad.imageUrl} alt={ad.name} className={styles.adImage} />
              <h2>{ad.name}</h2>
              <p>Цена: ${ad.price}</p>
              <p>Просмотры: {ad.views}</p>
              <p>Лайки: {ad.likes}</p>
            </Link>
          </li>
        ))}
      </ul>

      <Pagination
        totalItems={filteredAds.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <button onClick={() => setIsModalOpen(true)} className={styles.createAdButton}>
        Создать новое объявление
      </button>

      {isModalOpen && (
  <Modal 
    onClose={() => setIsModalOpen(false)} 
    onSubmit={handleSubmit}
    onNewAd={handleNewAd} 
  />
)}
    </div>
  );
};

export default AllAdvertisementsPage;
