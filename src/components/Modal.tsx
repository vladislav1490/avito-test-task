import { useState, useEffect } from 'react';
import styles from './Modal.module.css';
import { Advertisement } from '../types';

interface ModalProps {
  onClose: () => void;
  onSubmit: (ad: Advertisement) => void;
  onNewAd?: (newAd: Advertisement) => void;
  initialData?: Advertisement;
}

const Modal = ({ onClose, onSubmit, initialData }: ModalProps) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!initialData) {
      throw new Error("initialData is required for editing an advertisement.");
    }
  
    const updatedAd: Advertisement = {
      ...initialData,
      name,
      description,
      price: Number(price),
      imageUrl,
    };
  
    onSubmit(updatedAd);
    onClose();
  };
  

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>{initialData ? 'Редактировать объявление' : 'Создать новое объявление'}</h2>
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
