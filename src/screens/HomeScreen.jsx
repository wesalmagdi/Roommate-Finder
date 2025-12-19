import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AddPostButton from "../components/AddPostbutton";
import AddPostForm from "./AddPostForm";
import PostCard from "../components/Postcard";
import "./HomeScreen.css";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [openForm, setOpenForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. ADD THESE STATES FOR AMENITIES
  const [city, setCity] = useState("");
  const [budget, setBudget] = useState("");
  const [gender, setGender] = useState("");
  const [wifi, setWifi] = useState(false);
  const [ac, setAc] = useState(false);
  const [pets, setPets] = useState(false);
  
  const [isFiltered, setIsFiltered] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.getPosts();
      setPosts(Array.isArray(response) ? response : []);
      setLoading(false);
      setIsFiltered(false);
    } catch (err) {
      console.error("Failed to load posts:", err);
      setError("Failed to load posts from server.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (location.state?.reset && isFiltered) {
      setCity("");
      setBudget("");
      setGender("");
      setWifi(false); 
      setAc(false);
      setPets(false);
      fetchPosts();
    }
  }, [location.state]);

  const handleAddPost = async (postData) => {
    try {
      const token = user?.token;
      if (!token) {
        alert("You must be logged in to add a post.");
        return;
      }
      const response = await api.addPost(postData, token);
      const newPost = response.post;
      setPosts(prevPosts => [newPost, ...prevPosts]);
      setOpenForm(false);
    } catch (err) {
      console.error("Failed to add post:", err);
      if (err.message?.includes("Not authorized")) {
        logout();
        alert("Session expired, please log in again.");
      } else {
        alert("Failed to add post. Please try again.");
      }
    }
  };

  const handleSearchResults = async (filters) => {
    try {
      setLoading(true);
      setError(null);
      
 
      const response = await api.searchPosts(filters);
      
      
      const resultsArray = response.results || []; 
      
      setPosts(resultsArray);
      setIsFiltered(true);
    } catch (err) {
      console.error("Search failed:", err);
      setError("Search failed. Try again.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-screen">
      <div className="search-header">
        
        <SearchBar 
          onSearch={handleSearchResults} 
          city={city} setCity={setCity} 
          budget={budget} setBudget={setBudget} 
          gender={gender} setGender={setGender}
          wifi={wifi} setWifi={setWifi}
          ac={ac} setAc={setAc}
          pets={pets} setPets={setPets}
        />
        <AddPostButton onOpen={() => setOpenForm(true)} />
      </div>

      {openForm && (
        <AddPostForm
          onClose={() => setOpenForm(false)}
          onSubmit={handleAddPost}
        />
      )}

      {error && (
        <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
          {error}
        </div>
      )}

      <div className="posts-section" style={{ padding: "20px", marginTop: "20px" }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#666" }}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666", marginTop: "50px" }}>
            {isFiltered ? "No results found for your search." : "No posts yet. Click the + button to add your first post!"}
          </p>
        ) : (
          <div className={`posts-grid ${isFiltered ? 'filtered' : ''}`}>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}