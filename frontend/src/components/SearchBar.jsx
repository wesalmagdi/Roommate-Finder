import React from "react";
import "./SearchBar.css";

function SearchBar({ 
  onSearch, 
  city, setCity, 
  budget, setBudget, 
  gender, setGender,
  wifi, setWifi,      
  ac, setAc, 
  pet, setPet
}) {
  const [btnHovered, setBtnHovered] = React.useState(false);

  const governorates = [
    "Cairo","Alexandria","Port Said","Suez","Damietta","Dakahlia","Sharkia",
    "Qalyubia","Kafr El Sheikh","Gharbia","Monufia","Beheira","Ismailia","Giza",
    "Beni Suef","Fayoum","Minya","Asyut","Sohag","Qena","Luxor","Aswan",
    "Red Sea","New Valley","Matrouh","North Sinai","South Sinai"
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    
    const filters = {
      city,
      budget,
      gender,
    };

   
    if (wifi) filters.wifi = 'true';
    if (ac) filters.ac = 'true';
    if (pet) filters.pet = 'true';

    if (onSearch) onSearch(filters);
  };

  return (
    <form className="search-container" onSubmit={handleSearch}>
      {/* City Select */}
      <div className="field">
        <select value={city} onChange={(e) => setCity(e.target.value)} className="search-select" required>
          <option value="" disabled hidden>Select City</option>
          {governorates.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Gender Select */}
      <div className="field">
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="search-select" required>
          <option value="" disabled hidden>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {/* Budget Input */}
      <div className="field">
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="search-input"
          placeholder="Max Budget"
          min="0"
          required
        />
      </div>

      {/* Amenities Checkboxes */}
      <div className="amenities-container">
        <label className="checkbox-label-wifi">
          <input type="checkbox" checked={wifi} onChange={(e) => setWifi(e.target.checked)} />
          WiFi
        </label>
        <label className="checkbox-label-AC">
          <input type="checkbox" checked={ac} onChange={(e) => setAc(e.target.checked)} />
          AC
        </label>
        <label className="checkbox-label-pets">
          <input type="checkbox" checked={pet} onChange={(e) => setPet(e.target.checked)} />
          Pets
        </label>
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