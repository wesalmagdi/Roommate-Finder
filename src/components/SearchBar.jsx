import React from "react";
import "./SearchBar.css";

function SearchBar() {
  const [city, setcity] = React.useState("");
  const [budget, setbugdet] = React.useState("");
  const [gender, setGender] = React.useState("");
  /*const [roomType, setRoomType] = React.useState("");*/
  const [btnHovered, setBtnHovered] = React.useState(false);

  function handleSearch(e) {
    e.preventDefault();
    console.log("Search for:", {
      city,
      budget,
      gender,
    });
  }

  return (
    <form className="search-container" onSubmit={handleSearch}>
      
      <div className="field">
        <select
          value={city}
          onChange={(e) => setcity(e.target.value)}
          className="search-select"
        >
         <option value="" disabled hidden>city</option>
          <option value="Cairo">Cairo</option>
          <option value="Giza">Giza</option>
          <option value="Alexandria">Alexandria</option>
          <option value="Qalyubia">Qalyubia</option>
          <option value="Monufia">Monufia</option>
          <option value="Gharbia">Gharbia</option>
          <option value="Dakahlia">Dakahlia</option>
          <option value="Sharqia">Sharqia</option>
          <option value="Beheira">Beheira</option>
          <option value="Kafr El Sheikh">Kafr El Sheikh</option>
          <option value="Damietta">Damietta</option>
          <option value="Port Said">Port Said</option>
          <option value="Ismailia">Ismailia</option>
          <option value="Suez">Suez</option>
          <option value="North Sinai">North Sinai</option>
          <option value="South Sinai">South Sinai</option>
          <option value="Faiyum">Faiyum</option>
          <option value="Beni Suef">Beni Suef</option>
          <option value="Minya">Minya</option>
          <option value="Assiut">Assiut</option>
          <option value="Sohag">Sohag</option>
          <option value="Qena">Qena</option>
          <option value="Luxor">Luxor</option>
          <option value="Aswan">Aswan</option>
          <option value="Red Sea">Red Sea</option>
          <option value="New Valley">New Valley</option>
          <option value="Matruh">Matruh</option>
          <option value="Helwan">Helwan</option>

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
          onChange={(e) => setbugdet(e.target.value)}
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
