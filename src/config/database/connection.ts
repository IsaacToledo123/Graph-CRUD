import mongoose from 'mongoose';

const url: any = "mongodb://127.0.0.1:27017/youtube-clone";

async function connectToMongoDB() {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected")
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

export default connectToMongoDB;