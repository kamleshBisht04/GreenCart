import BestSeller from "../components/BestSeller";
import BootomBanner from "../components/BootomBanner";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import MainBanner from "../components/MainBanner";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />
      <Categories/>
      <BestSeller/>
      <BootomBanner/>
      <NewsLetter/>
    </div>
  );
};

export default Home;
