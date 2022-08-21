

import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";


export const getAllBlogs = async (req, res, next) => {
    let blogs;
    
    try {
      blogs = await Blog.find().populate("user");
     

      
    } catch (err) {
      return console.log(err);
    }
    if (!blogs) {
      return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
};



export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
  
    let existingUser;
    try{
      existingUser = await User.findById(user);
    } catch(err){
      return console.log(err);
    }
    if(!existingUser){
      return res.status(400).json({message: "Unable to Find User By This ID"});
    }
    const blog = new Blog({//defining a user as a new block
      title,
      description,
      image,
      user,//userID
    });
    try {
      //for connecting it with the users 
      const session = await mongoose.startSession();//defining a session to save the blog
      session.startTransaction();
      await blog.save({session});
      existingUser.blogs.push(blog);//pushing to the array of user
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.log(err);
      return res.status(500).json({message: err });
    }
  
    return res.status(200).json({ blog });
};



export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Update The Blog" });
  }
  return res.status(200).json({ blog });
};


export const getById = async (req, res, next) => {
  const id = req.params.id;//req.params= is an object of req object that contain route parameters. here id is the parameter.
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");//populate works for the reference collections & it'll reference to the user and find the details from the users as well
    await blog.user.blogs.pull(blog);// blog(which we defined).user(user object which came from populatefunction above).blog()pull()=used to delete.
    await blog.user.save();//jabtak we wont save the deleted changes tabtak we wont be able to see change at browser, so saving it is imp.
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};




//we'll get the blog details by a particular blog ID

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;//for making id as the value
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");//populate function will refer to the collection of blogs  get the data from blog collection
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ user: userBlogs });


};