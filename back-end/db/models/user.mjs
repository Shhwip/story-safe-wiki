import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fistname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  email:{
    type: String,
    required: true,
  },
  spoilerlevel: {
    type: Number,
    required: false,
  },
  salt: {
    type: String,
    required: true,
  },
});

export default mongoose.model('User', userSchema);


