import React from "react";
import { keyFeatures } from "../../data/keyFeatures";
import { AnimationOnScroll } from "react-animation-on-scroll";

const KeyFeatures = () => {
  return (
    <AnimationOnScroll animateIn="animate__bounceIn">
      <section className="container px-3 mx-auto mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-5">
        {keyFeatures.map((features) => (
          <div className="card shadow drop-shadow-sm" key={features.icon}>
            <div className="card-body flex justify-center items-center flex-col">
              <div className="flex font-semibold text-xl md:text-2xl">
                <h1>{features.title}</h1>
                <div className="">{features.icon}</div>
              </div>
              <p className="text-center">{features.description}</p>
            </div>
          </div>
        ))}
      </section>
    </AnimationOnScroll>
  );
};

export default KeyFeatures;
