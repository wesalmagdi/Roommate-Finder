import React from "react";
import './SearchBar.css';

function SearchBar() {
  const [location, setLocation] = React.useState("");
  const [minPrice, setMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [roomType, setRoomType] = React.useState("");

const styles = {
    container: {
      background: "#ffffffff",
      padding: "16px",
      borderRadius: "12px",
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
      margin: "80px auto 20px",
      maxWidth: "1200px",
      alignItems: "center",
      top: "-280px",
      position: "relative",
    },
    select: {
      height: "36px",
      padding: "6px 10px",
      borderRadius: "6px",
      border: "1px solid #e0e0e0",
      background: "white",
      minWidth: "140px",
      color: "black",
    },
    field: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      flex: "0 0 auto",
    },
    button: {
      height: "40px",
      padding: "0 14px",
      borderRadius: "8px",
      border: "none",
      background: "#242c4e",
      color: "white",
      cursor: "pointer",
        fontWeight: "bold",
    },

    
  };

  function handleSearch(e) {
    e.preventDefault();
    console.log("Search for:", { location, price, gender });
    // TODO: navigate to results or call API
  }

  return (
    <form style={styles.container} onSubmit={handleSearch} aria-label="Search roommates">
  <div style={styles.field}>
        <select
          id="location-select"
          aria-label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled selected hidden>Location</option>
          <option value="Nasr City">October</option>
          <option value="Maadi">Zayed</option>
          <option value="Dokki">Haram</option>
        </select>
      </div>


  <div style={styles.field}>
        <select
          id="roomType-select"
          aria-label="room_type"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled>Room Type</option>
          <option value="Nasr City">Single</option>
          <option value="Maadi">Shared</option>
          <option value="Dokki">Entire Place</option>
        </select>
      </div>

  <div style={styles.field}>
  <label style={{ marginBottom: "5px" }}></label>
  <select
    aria-label="Min Price"
    value={minPrice}
    onChange={(e) => setMinPrice(e.target.value)}
    style={styles.select}
  >
    <option value="" disabled selected hidden>Min Price</option>
    <option value="500">500 EGP</option>
    <option value="1000">1000 EGP</option>
    <option value="1500">1500 EGP</option>
    <option value="2000">2000 EGP</option>
    <option value="2500">2500 EGP</option>
  </select>
</div>

<div style={styles.field}>
  <label style={{ marginBottom: "5px" }}></label>
  <select
    aria-label="Max Price"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
    style={styles.select}
  >
    <option value="" disabled selected hidden>Max Price</option>
    <option value="3000">3000 EGP</option>
    <option value="3500">3500 EGP</option>
    <option value="4000">4000 EGP</option>
    <option value="4500">4500 EGP</option>
    <option value="5000">5000 EGP</option>
  </select>
</div>


  <div style={styles.field}>
        <select
          aria-label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={styles.select}
        >
          <option value="" disabled selected hidden>Semester</option>
          <option value="any">Fall</option>
          <option value="male">Spring</option>
          <option value="female">Summer</option>
          
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button type="submit" style={styles.button}>Search</button>
      </div>
    </form>
  );
}

export default SearchBar;