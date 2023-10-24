import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";

try {
  await mongoose.connect(connectionString, { dbName: "Story-Safe" });
  console.log("Successfully connected to MongoDB cluster using Mongoose");
} catch (e) {
  console.error(e);
}