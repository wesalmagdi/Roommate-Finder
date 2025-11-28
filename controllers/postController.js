const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      city,
      address,
      price,
      furnished,
      smokingAllowed,
      gender,
      amenities,
      images
    } = req.body;

    const post = await Post.create({
      title,
      description,
      location,
      city,
      address,
      price,
      furnished,
      smokingAllowed,
      gender,
      amenities,
      images,
      createdBy: req.user.id 
    });

    res.status(201).json({
      message: 'Post created successfully',
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('createdBy', 'name email');
    res.json(posts);
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPostById = async (req, res) => {
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

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ createdBy: req.user.id });
    res.json(posts);
  } catch (error) {
    console.error('Get my posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePost = async (req, res) => {
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
      'location',
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

exports.deletePost = async (req, res) => {
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
