import React from "react";
import letter from "../../assets/letter.png";
import { AnimationOnScroll } from "react-animation-on-scroll";
function NewsLetter() {
  return (
    <AnimationOnScroll animateIn="animate__fadeInLeftBig">
      <section className="bg-gray-300 py-4 px-1">
        <div className="container mx-auto flex justify-between items-center">
          <div className="w-full hidden md:block">
            <img src={letter} alt="new letter" className="w-full" />
          </div>
          <div className="w-full">
            <h3 className="font-bold text-2xl  text-center md:text-left md:text-4xl mb-3 text-gray-900">
              Subscribe to UniShare Updates!
            </h3>
            <p className="my-3 text-center md:text-left">
              Join our community of academic enthusiasts by subscribing to
              UniShare's newsletter. Stay in the loop with the latest materials,
              collaborative discussions, and exciting platform updates. Don't
              miss out on the key to a more connected and enriched learning
              experience! Enter your email below to stay informed.
            </p>
            <form className="w-full relative">
              <div className="form-control w-full">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                />
              </div>
              <button
                type="submit"
                className="btn btn-secondary text-white text-md btn-md my-5 absolute -top-5 right-0"
              >
                Subscribe
              </button>
            </form>
            <p className=" mt-2 text-center md:text-left">
              Welcome to a world of shared knowledge and endless possibilities
              with UniShare!
            </p>
          </div>
        </div>
      </section>
    </AnimationOnScroll>
  );
}

export default NewsLetter;
