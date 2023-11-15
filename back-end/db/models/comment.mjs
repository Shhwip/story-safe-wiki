import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  },
  timeStamp: {
    type: Date,
    required: true
  },
  flags: {
    type: Number,
    required: true
  },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;