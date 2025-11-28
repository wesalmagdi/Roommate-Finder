import React from "react";
import "./SearchBar.css";

function SearchBar() {
  const [location, setLocation] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [roomType, setRoomType] = React.useState("");
  const [btnHovered, setBtnHovered] = React.useState(false);

  function handleSearch(e) {
    e.preventDefault();
    console.log("Search for:", {
      location,
      minPrice,
      maxPrice,
      gender,
      roomType,
    });
  }

  return (
    <form className="search-container" onSubmit={handleSearch}>
      
      <div className="field">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="search-select"
        >
          <option value="" disabled hidden>Location</option>
          <option value="October">October</option>
          <option value="Zayed">Zayed</option>
          <option value="Haram">Haram</option>
        </select>
      </div>

      <div className="field">
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="search-select"
        >
          <option value="" disabled hidden>Room Type</option>
          <option value="Single">Single</option>
          <option value="Shared">Shared</option>
          <option value="Entire">Entire Place</option>
        </select>
      </div>

      <div className="field">
        <select
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="search-select"
        >
          <option value="" disabled hidden>Min Price</option>
          <option value="1000">1000 EGP</option>
          <option value="1500">1500 EGP</option>
          <option value="2000">2000 EGP</option>
          
        </select>
      </div>

      <div className="field">
        <select
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="search-select"
        >
          <option value="" disabled hidden>Max Price</option>
          <option value="3000">3000 EGP</option>
          <option value="3500">3500 EGP</option>
          <option value="4000">4000 EGP</option>
          <option value="4500">4500 EGP</option>

        </select>
      </div>

      <div className="field">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="search-select"
        >
          <option value="" disabled hidden>Semester</option>
          <option value="Fall">Fall</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>
      </div>

      <button
        type="submit"
        className={`search-btn ${btnHovered ? "hovered" : ""}`}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;