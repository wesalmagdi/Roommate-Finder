import React from "react";
import "./SearchBar.css";
import api from "../api"; // <-- use API helper

function SearchBar({ onSearch }) { // receive callback from HomeScreen
  const [city, setCity] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [btnHovered, setBtnHovered] = React.useState(false);

  const governorates = [
    "Cairo","Alexandria","Port Said","Suez","Damietta","Dakahlia","Sharkia",
    "Qalyubia","Kafr El Sheikh","Gharbia","Monufia","Beheira","Ismailia","Giza",
    "Beni Suef","Fayoum","Minya","Asyut","Sohag","Qena","Luxor","Aswan",
    "Red Sea","New Valley","Matrouh","North Sinai","South Sinai"
  ];

const handleSearch = async (e) => {
  e.preventDefault();

  const filters = {};
  if (city) filters.city = city;
  if (gender) filters.gender = gender;
  if (budget) filters.budget = budget;

  if (onSearch) onSearch(filters);
  // try {
  //   const results = await api.searchPosts(filters);
  //   console.log("Search results:", results);
  //   if (onSearch) onSearch(results);
  // } catch (err) {
  //   console.error("Search failed:", err);
  //   alert("Search failed. Try again.");
  // }
};



  return (
    <form className="search-container" onSubmit={handleSearch}>
      <div className="field">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-select"
        >
          <option value="" disabled hidden>Select City</option>
          {governorates.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="search-select"
        >
          <option value="" disabled hidden>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="field">
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="search-input"
          placeholder="Min Budget (EGP)"
          min="0"
        />
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
