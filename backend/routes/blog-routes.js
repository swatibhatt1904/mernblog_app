import express, { Router } from "express";
import { getAllBlogs, addBlog,  updateBlog, getById, deleteBlog, getByUserId} from "../controllers/blog-controller";
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId);


/*router.put('/like',requireLogin,(req,res)=> {
  post.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user}
  },{
    new:true
  }).exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }else{
      res.json(result)
    }
  })
})


router.put('/unlike',requireLogin,(req,res)=> {
  post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.user}
  },{
    new:true
  }).exec((err,result)=>{
    if(err){
      return res.status(422).json({error:err})
    }else{
      res.json(result)
    }
  })
})*/

export default blogRouter;