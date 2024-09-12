import { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import { Advertisement } from '../types';
import { createAdvertisement, updateAdvertisement } from '../modules/advertisements/services/advertisementService';

interface ModalProps {
  onClose: () => void;
  onSubmit: (ad: Partial<Advertisement>) => void;
  onNewAd?: (newAd: Advertisement) => void; 
  initialData?: Advertisement;
}

const Modal = ({ onClose, onNewAd, initialData }: ModalProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [price, setPrice] = useState(initialData?.price.toString() || '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setDescription(initialData.description || ''); 
      setPrice(initialData.price?.toString() || '');
      setImageUrl(initialData.imageUrl || '');
    }
  }, [initialData]);

  const handleSubmit = async () => {
    const ad: Omit<Advertisement, 'id'> = {
      name,
      description,
      price: Number(price),
      imageUrl,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      views: initialData?.views || 0,
      likes: initialData?.likes || 0,
    };
  
    try {
      if (initialData) {
        await updateAdvertisement(initialData.id, ad);
      } else {
        const newAd = await createAdvertisement(ad);
        if (onNewAd) {
          onNewAd(newAd);
        }
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>{initialData ? 'Edit ad' : 'Create a new ad'}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className={styles.modalButtons}>
            <button type="submit" className={styles.saveButton}>Save</button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
