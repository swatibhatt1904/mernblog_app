import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,//bcoz url will be of string type
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",//refference of the user model
    required: true,
  }

});

export default mongoose.model("Blog", blogSchema);

/* likes:[{type:ObjectId,ref:"User"}],
  postedBy:{
    type:ObjectId,
    ref:"User"
  }
  */