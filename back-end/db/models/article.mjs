import mongoose from "mongoose"

const articleSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    unique: false
  },
  title: {
    type: String,
    required: true,
    unique: true
  }
})

const Article = mongoose.model('Article', articleSchema)

export default Article


