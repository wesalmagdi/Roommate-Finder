const BASE_URL = "http://localhost:5000/api";

export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const text = await response.text(); // get raw response
  let data;
  try {
    data = JSON.parse(text); // try parse JSON
  } catch {
    throw new Error(`Invalid server response: ${text}`);
  }

  if (!response.ok) throw new Error(data.message || 'Registration failed');
  return data;
}



export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Login failed');
  return data;
}


export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  return response.json();
}

export async function addPost(postData, token) {
  const form = new FormData();

  // append text fields, booleans and arrays/objects properly
  Object.keys(postData).forEach((key) => {
    if (key === "images") return; // handled separately below

    const value = postData[key];

    if (typeof value === "boolean") {
      form.append(key, value ? "true" : "false");
    } else if (Array.isArray(value) || (value && typeof value === "object")) {
      // arrays and objects -> JSON string
      form.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      form.append(key, String(value));
    }
  });

  
  if (Array.isArray(postData.images)) {
    postData.images.forEach((file) => {
      form.append("images", file);
    });
  }

  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Create post failed");
  return data; 
}


export async function searchPosts(filters = {}) { 
  // Only include keys that have values
  const queryObj = {};
  if (filters.city) queryObj.city = filters.city;
  if (filters.gender) queryObj.gender = filters.gender;
  if (filters.budget) queryObj.budget = filters.budget;
  if (filters.wifi !== undefined) queryObj.wifi = filters.wifi;
  if (filters.ac !== undefined) queryObj.ac = filters.ac;
  if (filters.pets !== undefined) queryObj.pet = filters.pets;

  const query = new URLSearchParams(queryObj).toString();
  const response = await fetch(`${BASE_URL}/posts/search?${query}`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Search failed');
  return data;
}

export async function getMyPosts(token) {
  const response = await fetch(`${BASE_URL}/posts/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Get my posts failed');
  return data;
}

export async function updatePost(postId, postData, token) {
  const form = new FormData();

 
  Object.keys(postData).forEach((key) => {
    if (key === "images") return; 

    const value = postData[key];

    if (typeof value === "boolean") {
      form.append(key, value ? "true" : "false");
    } else if (Array.isArray(value) || (value && typeof value === "object")) {
      // arrays and objects -> JSON string
      form.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      form.append(key, String(value));
    }
  });

  // append images (File objects)
  if (Array.isArray(postData.images)) {
    postData.images.forEach((file) => {
      form.append("images", file);
    });
  }

  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Update post failed");
  return data;
}

export async function deletePost(postId, token) {
  const response = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Delete post failed");
  }
}

export default {
  registerUser,
  loginUser,
  getPosts,
  addPost,
  searchPosts,
  getMyPosts,
  updatePost,
  deletePost
};
