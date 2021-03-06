const mongoose = require('mongoose');
const { MONGO_URI } = require('./constants');

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    console.log(`MongoDB connected: ${connect.connection.host}`.rainbow);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
