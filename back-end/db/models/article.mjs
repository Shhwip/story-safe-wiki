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
  },
  infobox:{
    type: String,
    required: false,
    unique: false
  },
  spoiler_level: {
    type: Number,
    required: false,
    unique: false
  },
})

const Article = mongoose.model('Article', articleSchema)

export default Article


