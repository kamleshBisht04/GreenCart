import React from "react";
import { assets, features } from "./../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="hidden w-full md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="w-full md:hidden"
      />

      <div className="absolute inset-0 flex flex-col items-center pt-16 md:items-end md:justify-center md:pt-0 md:pr-24">
        <div>
          <h1 className="text-primary mb-6 text-2xl font-semibold md:text-3xl">
            Why We Are the Best?
          </h1>
          {features.map((feature, index) => (
            <div key={index} className="mt-2 flex items-center gap-4">
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-9 md:w-11"
              />
              <div>
                <h3 className="text-lg font-semibold md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500/70 md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
