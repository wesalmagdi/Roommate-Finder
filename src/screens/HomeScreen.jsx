import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import AddPostButton from "../components/AddPostbutton";
<<<<<<< HEAD
import AddPostForm from "./AppPostFrom";
=======
import AddPostForm from "./AddPostForm";
import PostCard from "../components/Postcard";
>>>>>>> F_AddPost
import "./HomeScreen.css";

export default function HomeScreen() {
  const [openForm, setOpenForm] = useState(false);
<<<<<<< HEAD

  return (
   <div className="home-screen">
  
=======
  const [posts, setPosts] = useState([]);

  const handleAddPost = (postData) => {
    const newPost = {
      id: Date.now(),
      ...postData
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
   <div className="home-screen">

>>>>>>> F_AddPost
        <div className="search-header">
            <SearchBar />
            <AddPostButton onOpen={() => setOpenForm(true)} />
        </div>
<<<<<<< HEAD
           {openForm && <AddPostForm onClose={() => setOpenForm(false)} />}
              
=======
           {openForm && <AddPostForm onClose={() => setOpenForm(false)} onSubmit={handleAddPost} />}

        {/* Posts Section */}
        <div className="posts-section" style={{ padding: "20px", marginTop: "20px" }}>
          {posts.length === 0 ? (
            <p style={{ textAlign: "center", color: "#666", marginTop: "50px" }}>
              No posts yet. Click the + button to add your first post!
            </p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>

>>>>>>> F_AddPost
         {/* 👇 Add long scroll area ONLY for Home screen */}
      <div style={{ height: "2000px", marginTop: "50px" }}>
        <h2 style={{ paddingTop: "100px", textAlign: "center" }}>
          Scroll to test sticky navbar
        </h2>
      </div>

    </div>

  );
}
