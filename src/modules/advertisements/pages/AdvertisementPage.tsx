import { useParams } from 'react-router-dom';

const AdvertisementPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Advertisement Details</h1>
      <p>Displaying advertisement with ID: {id}</p>
    </div>
  );
};

export default AdvertisementPage;
