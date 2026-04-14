import BestSeller from "../components/BestSeller";
import BootomBanner from "../components/BootomBanner";
import Categories from "../components/Categories";
import MainBanner from "../components/MainBanner";

const Home = () => {
  return (
    <div className="mt-10">
      <MainBanner />
      <Categories/>
      <BestSeller/>
      <BootomBanner/>
    </div>
  );
};

export default Home;
