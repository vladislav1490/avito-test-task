import { useState } from 'react';
import styles from './Modal.module.css';
import { Advertisement } from '../types';
import { createAdvertisement } from '../modules/advertisements/services/advertisementService';

interface ModalProps {
  onClose: () => void;
  onNewAd: (ad: Advertisement) => void;
}

const Modal = ({ onClose, onNewAd }: ModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAd: Omit<Advertisement, 'id'> = {
      name,
      description,
      price: Number(price),
      imageUrl,
      views: 0,
      likes: 0,
      createdAt: new Date().toISOString(), 
    };
    try {
      const createdAd = await createAdvertisement(newAd);
      onNewAd(createdAd)
      onClose();
    } catch (error) {
      console.error('Error creating ad:', error);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Создать новое объявление</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Название:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Описание:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Цена:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="imageUrl">URL изображения:</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <div className={styles.modalButtons}>
            <button type="submit" className={styles.saveButton}>Сохранить</button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
