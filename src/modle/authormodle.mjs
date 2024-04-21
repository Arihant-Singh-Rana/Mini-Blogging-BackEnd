import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  fname: {
    type: String,
    trim: true,
    required: true,
  },
  lname: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
    enum: ["Mr", "Mrs", "Miss", "Master"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
},{timestamps : true});

export default mongoose.model("Authors Collection",authorSchema);