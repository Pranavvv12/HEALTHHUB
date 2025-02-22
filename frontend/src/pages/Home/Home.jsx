import React from "react";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import Showcase from "../../components/Showcase/Showcase";

const Home = ({ onSignUpClick }) => {
  return (
    <div>
      <Header />
      <ExploreMenu />
      <Showcase />
    </div>
  );
};

export default Home;
