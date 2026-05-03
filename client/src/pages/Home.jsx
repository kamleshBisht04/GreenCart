import BestSeller from '../components/BestSeller';
import BootomBanner from '../components/BootomBanner';
import Categories from '../components/Categories';
import CategoryBar from '../components/CategoryBar';
import CategoryProducts from '../components/CategoryProducts';
import MainBanner from '../components/MainBanner';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
  return (
    <div className="mt-6">
      <CategoryBar />
      <MainBanner />
      <Categories />
      <CategoryProducts title="Fresh Fruits You’ll Love" category="fruits" />
      <BestSeller />
      <CategoryProducts
        title="Pure & Fresh Dairy Essentials"
        category="Dairy"
      />
      <BootomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
