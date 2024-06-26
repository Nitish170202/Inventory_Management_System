const mongoose = require('mongoose');
const mongoDB = "mongodb://localhost:27017/INVENTORY_MANAGEMENT_SYSTEM";
const {MongoClient} = require('mongodb')

mongoose.connect(mongoDB, {
  useNewUrlParser: "true",
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");

});




