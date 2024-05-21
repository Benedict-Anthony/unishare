import React from "react";

import Typewriter from "typewriter-effect";

import ebus from "../../assets/ebuss.png";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <section className="bg-gray-200 pt-4">
      <div className="flex justify-between items-center flex-col md:flex-row ">
        <div className="container mx-auto flex justify-start items-start gap-5 md:text-6xl flex-col md:py-16 px-6 text-3xl ">
          <h1 className="font-semibold -mb-3">Materials are here for </h1>
          <span className="text-blue-600 font-bold">
            <Typewriter
              options={{
                strings: ["Downloads ⬇️ ", "Uploads ⬆️", "Search 🔍"],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
          <p className="py-3 md:text-2xl text-[17px] text-left font-normal ">
            UniShare is more than just a platform; it's a community-driven space
            where knowledge knows no bounds. Join us in creating a vibrant
            academic ecosystem at the University of Benin
          </p>
          <button className="btn btn-outline text-blue-600 btn-lg mt-5 hidden md:block">
            <Link to={"/books"}>Get Started</Link>
          </button>
        </div>
        <div className="w-full">
          <img src={ebus} alt="ebus" className="w-full" />
        </div>
        <button className="btn btn-outline text-blue-600 btn-md mt-5 block md:hidden mb-3 w-3/4">
          <Link to={"/books"}>Get Started</Link>
        </button>
      </div>
    </section>
  );
};

export default Landing;
