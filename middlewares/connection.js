import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully!");
  } catch (err) {
    console.log("Error connecting to Database");
  }
};

export default connectToDatabase;