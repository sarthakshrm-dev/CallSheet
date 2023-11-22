require("dotenv").config();
const mongoose = require("mongoose");

const local = process.env.LOCAL_DB; // use this when you need local mongodb database
const cloud =
  process.env.CLOUD_DB ||
  "mongodb+srv://callsheet:callsheet123@cluster0.etfkyyl.mongodb.net/callsheet?retryWrites=true&w=majority"; // use this for cloud mongodb database connection

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(cloud, options);
    console.log("MongoDB connected!!");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }

  // try {
  //     let mongoClient;
  //     mongoClient = new MongoClient(uri);
  //     console.log('Connecting to MongoDB Atlas cluster...');
  //     await mongoClient.connect();
  //     console.log('Successfully connected to MongoDB Atlas!');

  //     return mongoClient;
  // } catch (error) {
  //     console.error('Connection to MongoDB Atlas failed!', error);
  //     process.exit();
  // }
};

module.exports = connectDB;
