import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    delta: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    previousID: {
        type: String,
        required: false,
    },
    outputSize: {
        type: Number,
        required: false,
    },
});

export default mongoose.model('History', historySchema);


