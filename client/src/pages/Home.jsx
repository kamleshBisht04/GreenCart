import BestSeller from '../components/BestSeller';
import BootomBanner from '../components/BootomBanner';
import CategoryBar from '../components/CategoryBar';
import CategoryProducts from '../components/CategoryProducts';
import Loader from '../components/Loader';
import MainBanner from '../components/MainBanner';
import NewsLetter from '../components/NewsLetter';
import { useAppContext } from '../context/AppContext';

const Home = () => {
  const { loading } = useAppContext();
  return (
    <div className="mt-6">
      <CategoryBar />
      <MainBanner />

      {loading ? (
        <Loader />
      ) : (
        <>
          <CategoryProducts
            title="Fresh Fruits You’ll Love"
            category="fruits"
            limit={14}
          />
          <BestSeller />
          <CategoryProducts
            title="Pure & Fresh Dairy Essentials"
            category="Dairy"
          />
          <CategoryProducts
            title=" Wholesome Grains for Your Kitchen"
            category="Grains"
            limit={14}
          />
          <CategoryProducts
            title="Crafted for True Chocolate Lovers"
            category="Sweets"
            limit={14}
          />
        </>
      )}
      <BootomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
