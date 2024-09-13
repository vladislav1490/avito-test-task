import { useEffect, useState } from 'react';
import { fetchAdvertisements, createAdvertisement, updateAdvertisement } from '../services/advertisementService';
import { Advertisement } from '../../../types';
import Pagination from '../../../components/pagination/Pagination';
import Modal from '../../../components/modal/Modal';
import AdvertisementItem from '../components/AdvertisementItem';
import styles from '../styles/AllAdvertisementsPage.module.css';
import loaderStyles from '../styles/Loader.module.css';

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
        setLoading(false);
      }
    };
    loadAdvertisements();
  }, []);

  const handleSubmit = async (ad: Partial<Advertisement>) => {
    try {
      if (ad.id) {
        const updatedAd = await updateAdvertisement(ad.id, ad);
        setAds((prevAds) =>
          prevAds.map((item) => (item.id === ad.id ? updatedAd : item))
        );
      } else {
        const newAd = await createAdvertisement(ad as Omit<Advertisement, 'id'>);
        setAds((prevAds) => [...prevAds, newAd]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };

  useEffect(() => {
    const filtered = ads.filter((ad) =>
      ad.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAds(filtered);
    setCurrentPage(1);
  }, [searchTerm, ads]);

  if (loading) return <div className={loaderStyles.loader}></div>;

  const indexOfLastAd = currentPage * itemsPerPage;
  const indexOfFirstAd = indexOfLastAd - itemsPerPage;
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd);

  return (
    <div className={styles.container}>
          <div className={styles.width_container}>
      <h1 className={styles.title}>Advertisements</h1>

      <div className={styles.btn_container}>
        <div className={styles.input_container}>
          <div>
            <input
              type="text"
              placeholder="Search by name  🔎"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

        <div className={styles.itemsPerPage}>
          <label htmlFor="items-per-page">Show: </label>
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
        </div>
            
        <div>
          <button onClick={() => setIsModalOpen(true)} className={styles.createAdButton}>
              Create new advertisement
            </button>
        </div>
    </div>
   

      <ul className={styles.adsList}>
        {currentAds.map((ad) => (
          <li key={ad.id} className={styles.adItem}>
            <AdvertisementItem advertisement={ad} />
          </li>
        ))}
      </ul>

      <Pagination
        totalItems={filteredAds.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  </div>
  );
};

export default AllAdvertisementsPage;
