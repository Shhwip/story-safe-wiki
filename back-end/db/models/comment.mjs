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
    required: false
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: false
  },
  timeStamp: {
    type: Date,
    required: true
  },
  flags: {
    type: Number,
    required: true
  },
  ip: {
    type: String,
    required: false
  }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;