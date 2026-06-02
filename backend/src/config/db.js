import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log(`mongodb connected`)
  } catch (error) {
    console.log(`mongodb connection issue: ${error}`)
  }
}