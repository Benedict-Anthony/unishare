import React, { Fragment } from "react";
import Landing from "../components/Home/Landing";
import KeyFeatures from "../components/Home/KeyFeatures";
import NewsLetter from "../components/Home/NewsLetter";

const Home = () => {
  return (
    <Fragment>
      <Landing />
      <KeyFeatures />
      <NewsLetter />
    </Fragment>
  );
};

export default Home;
