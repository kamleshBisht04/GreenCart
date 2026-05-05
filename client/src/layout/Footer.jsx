import { assets, footerLinks } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Footer = () => {
  const { navigate } = useAppContext();
  return (
    <footer className="bg-primary/5 mt-24 w-full">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 xl:px-20">
        {/* MAIN SECTION */}
        <div className="flex flex-col gap-12 border-b border-gray-200 py-14 text-gray-600 lg:flex-row lg:justify-between">
          {/* BRAND */}
          <div className="w-full lg:max-w-sm">
            <img
              className="w-28 cursor-pointer md:w-32"
              src={assets.logo}
              alt="logo"
              onClick={() => {
                navigate('/');
                scrollTo(0, 0);
              }}
            />

            <p className="mt-5 text-sm leading-6 text-gray-500">
              Fresh groceries delivered to your doorstep with speed and care. We
              make shopping simple, affordable, and reliable for every
              household.
            </p>
          </div>

          {/* LINKS */}
          <div className="grid w-full grid-cols-2 gap-12 sm:grid-cols-3 lg:flex lg:justify-between lg:gap-20">
            {footerLinks.map((section, index) => (
              <div key={index} className="min-w-[140px]">
                <h3 className="mb-4 text-sm font-semibold text-gray-800 lg:text-base">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        className="inline-block text-sm text-gray-500 transition hover:translate-x-1 hover:text-green-600 lg:text-base"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="py-6 text-center text-xs text-gray-500 md:text-sm">
          © {new Date().getFullYear()} KamleshBisht. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
