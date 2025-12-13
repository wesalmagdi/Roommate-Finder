import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { getMyPosts, deletePost, updatePost } from "../api/index.js";
import AddPostForm from "./AddPostForm.jsx";
import "./ProfileScreen.css";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null); // State for editing post
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      if (!token) return;
      const data = await getMyPosts(token);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (postId) => {
    setPostToDelete(postId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      await deletePost(postToDelete, token);
      setPosts(posts.filter(post => post._id !== postToDelete));
      setShowDeleteModal(false);
      setPostToDelete(null);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const handleEdit = (post) => {
    setEditingPost(post); // Set the post to edit
  };

  const handleUpdate = async (updatedData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
      const data = await updatePost(editingPost._id, updatedData, token);
      setPosts(posts.map(post => post._id === editingPost._id ? data.post : post));
      setEditingPost(null);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleCloseEdit = () => {
    setEditingPost(null);
  };

  if (loading) return <div className="profile-container">Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div className="user-info">
        <p><b>Name:</b> {user?.name}</p>
        <p><b>Email:</b> {user?.email}</p>
      </div>
      <h2>My Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className="posts-list">
          {posts.map(post => (
            <div key={post._id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p><b>City:</b> {post.city}</p>
              <p><b>Price:</b> {post.price} EGP</p>
              <div className="post-actions">
                <button onClick={() => handleEdit(post)}>Edit</button>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editingPost && (
        <AddPostForm
          onClose={handleCloseEdit}
          onSubmit={handleUpdate}
          initialData={editingPost} // Pass initial data for editing
        />
      )}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this post?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
              <button className="confirm-btn" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
