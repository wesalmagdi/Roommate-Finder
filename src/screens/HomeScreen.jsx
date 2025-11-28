import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import AddPostButton from "../components/AddPostbutton";
import AddPostForm from "./AppPostFrom";
import "./HomeScreen.css";

export default function HomeScreen() {
  const [openForm, setOpenForm] = useState(false);

  return (
   <div className="home-screen">
  
        <div className="search-header">
            <SearchBar />
            <AddPostButton onOpen={() => setOpenForm(true)} />
        </div>
           {openForm && <AddPostForm onClose={() => setOpenForm(false)} />}
              
         {/* 👇 Add long scroll area ONLY for Home screen */}
      <div style={{ height: "2000px", marginTop: "50px" }}>
        <h2 style={{ paddingTop: "100px", textAlign: "center" }}>
          Scroll to test sticky navbar
        </h2>
      </div>

    </div>

  );
}
