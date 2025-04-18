import mongoose from "mongoose";
import { BlogModel } from "../models/blogSchema.js";

export const createBlog = async (req, res) => {
  const { title, content, image, author } = req.body;
  console.log("request body data : ",req.body);
  try {
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Fill All Required Fields!",
      });
    }
    const newBlog = new BlogModel({ title, content, image, author });
    await newBlog.save();
    res.status(201).json({
      success: true,
      message: "Blog Created Successfully!",
      data: newBlog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal server error ${err}`,
    });
  }
};
export const getAllBlogs = async (req, res) => {
  try {
    const allBlogs = await BlogModel.find({});
    res.status(200).json({
      success: true,
      message: "Blogs Fetched Successfully!",
      data: allBlogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal server error ${err}`,
    });
  }
};
export const getBlogsByAuthorId = async (req, res) => {
  const { authorId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(authorId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Author ID",
    });
  }
  try {
    const authorBlogs = await BlogModel.find({ author: authorId });
    res.status(200).json({
      success: true,
      message: `Blogs by Author ID: ${authorId} Fetched Successfully!`,
      data: authorBlogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal server error ${err}`,
    });
  }
};
export const getSingleBlog = async (req, res) => {
  const { blogId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Blog ID",
    });
  }
  try {
    const readBlog = await BlogModel.findById(blogId);
    res.status(200).json({
      success: true,
      message: "Blog Fetched successfully!",
      data: readBlog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal server error ${err}`,
    });
  }
};
export const updateBlog = async (req, res) => {
  const { title, content, image, author } = req.body;
  const { blogId } = req.params;
  try {
    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: blogId },
      { title, content, image, author },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Update Successfully!",
      data: updatedBlog,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Internal server error ${err}`,
    });
  }
};
export const deleteBlog = async (req,res) => {
    const { blogId } = req.params;
    try{
        const deleteBlog = await BlogModel.findByIdAndDelete({_id:blogId});
        if(!deleteBlog){
            return res.status(404).json({
                success: false,
                message: "Failed to delete the Blog"
            })
        }
        res.status(200).json({
            success: true,
            message: "Deleted Successfully!",
            data: deleteBlog
        })
    }catch(err){
        res.status(500).json({
      success: false,
      message: `Internal server error ${err}`,
    });
    }
};


