import BestSeller from "../components/BestSeller";
import BootomBanner from "../components/BootomBanner";
import Categories from "../components/Categories";
import CategoryBar from "../components/CategoryBar";
import Loader from "../components/Loader";
import MainBanner from "../components/MainBanner";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="mt-6">
      <Loader/>
      <CategoryBar/>
      <MainBanner />
      <Categories/>

      <BestSeller/>
      <BootomBanner/>
      <NewsLetter/>
    </div>
  );
};

export default Home;
