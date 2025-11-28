import React from "react";
import './HomeScreen.css';

import SearchBar from "../components/SearchBar";

function HomeScreen() {
  return (
    <div className="home-screen">

      <div className="search-wrapper">
        <SearchBar />
      </div>

      

    </div>
  );
}

export default HomeScreen;
