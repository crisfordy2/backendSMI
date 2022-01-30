import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with MongoDB: OK");
  } catch (e) {
    console.log("Error connecting to MongoDB: \n" + e);
  }
};

export default { dbConnection };