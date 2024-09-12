import { Advertisement } from '../../../types';

const API_URL = 'http://localhost:3000';

export const fetchAdvertisements = async (): Promise<Advertisement[]> => {
  const response = await fetch(`${API_URL}/advertisements`);
  if (!response.ok) {
    throw new Error('Failed to load ads');
  }
  return response.json();
};

export const fetchAdvertisementById = async (id: string): Promise<Advertisement> => {
  const response = await fetch(`${API_URL}/advertisements/${id}`);
  if (!response.ok) {
    throw new Error('Failed to load ad');
  }
  return response.json();
};

export const createAdvertisement = async (ad: Omit<Advertisement, 'id'>): Promise<Advertisement> => {
  const response = await fetch(`${API_URL}/advertisements`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ad),
  });

  if (!response.ok) {
    throw new Error('Failed to create ad');
  }

  return response.json();
};

export const updateAdvertisement = async (id: string, ad: Partial<Advertisement>): Promise<Advertisement> => {
  const response = await fetch(`${API_URL}/advertisements/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ad),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update ad');
  }
  
  return response.json();
};
