import Post from '../models/Post.js';

// ---------------------- CREATE POST ----------------------
export const createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      city,
      address,
      price,
      furnished,
      smokingAllowed,
      gender,
      contact_Email,
      contact_Phone,
    } = req.body;

    const amenitiesMap = {
      "WiFi": "wifi",
      "Parking": "parking",
      "Air Conditioning": "airConditioning",
      "Laundry": "washingMachine",
      "Fridge": "fridge",
      "Elevator": "elevator",
      "Balcony": "balcony",
      "Pet Friendly": "petFriendly"
    };

    const amenitiesObject = {};
    const incomingAmenities = req.body.amenities ? JSON.parse(req.body.amenities) : [];
    incomingAmenities.forEach(a => {
      const key = amenitiesMap[a];
      if (key) amenitiesObject[key] = true;
    });

    const images = req.files?.map(f => f.filename) || [];

    const post = await Post.create({
      title,
      description,
      city,
      address,
      price,
      furnished: furnished === "true",
      smokingAllowed: smokingAllowed === "true",
      gender,
      amenities: amenitiesObject,
      contact_Email,
      contact_Phone,
      images,
      createdBy: req.user.id // Uncommented to associate posts with authenticated users
    });

    res.status(201).json({ message: "Post created successfully", post });

  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// ---------------------- GET POSTS ----------------------
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('createdBy', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error('Get post by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------------- USER POSTS ----------------------
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id });
    res.json(posts);
  } catch (error) {
    console.error('Get my posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------------- UPDATE POST ----------------------
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const updatableFields = [
      'title',
      'description',
      'city',
      'address',
      'price',
      'furnished',
      'smokingAllowed',
      'gender',
      'amenities',
      'images'
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        post[field] = req.body[field];
      }
    });

    await post.save();

    res.json({
      message: 'Post updated successfully',
      post
    });
  } catch (error) {
    console.error('Update post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------------- DELETE POST ----------------------
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ---------------------- SEARCH POSTS ----------------------
export const searchPosts = async (req, res) => {
  try {
    const { city, budget, gender, wifi, ac, pet } = req.query;

    const filter = {
      city: city,
      price: { $lte: Number(budget) },
      gender: gender
    };

 
    if (wifi === 'true') {
      filter['amenities.wifi'] = true;
    }

    if (ac === 'true') {
      filter['amenities.airConditioning'] = true; 
    }

    if (pet === 'true') {
      filter['amenities.petFriendly'] = true;
    }

  
    console.log("SEARCHING DATABASE WITH FILTER:", JSON.stringify(filter, null, 2));

    const posts = await Post.find(filter);
    res.status(200).json({ results: posts });

  } catch (error) {
    console.error('Search posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};