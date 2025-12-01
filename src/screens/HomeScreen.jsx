import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import AddPostButton from "../components/AddPostbutton";
import AddPostForm from "./AddPostForm";
import PostCard from "../components/Postcard";
import "./HomeScreen.css";
import api from "../api"; 
import { getPosts, addPost, searchPosts } from "../api";
export default function HomeScreen() {
  const [openForm, setOpenForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchPosts = async () => {
  try {
    setLoading(true);
    const response = await api.getPosts();
    setPosts(Array.isArray(response) ? response : []); // <-- always array
    setLoading(false);
  } catch (err) {
    console.error("Failed to load posts:", err);
    setError("Failed to load posts from server.");
    setLoading(false);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);

const handleAddPost = async (postData) => {
  try {
    const response = await api.addPost(postData); // { message, post }
    const newPost = response.post; // <-- get the post object
    setPosts(prevPosts => [newPost, ...prevPosts]);
    setOpenForm(false);
  } catch (err) {
    console.error("Failed to add post:", err);
    alert("Failed to add post. Please try again.");
  }
};



const handleSearchResults = async (filters) => {
  try {
    setLoading(true);
    setError(null);
    const results = await api.searchPosts(filters);
    setPosts(Array.isArray(results) ? [...results] : []);
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
        <SearchBar onSearch={handleSearchResults} /> {/* pass callback */}
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
            No posts yet. Click the + button to add your first post!
          </p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>

      <div style={{ height: "2000px", marginTop: "50px" }}>
        <h2 style={{ paddingTop: "100px", textAlign: "center" }}>
          Scroll to test sticky navbar
        </h2>
      </div>
    </div>
  );
}
