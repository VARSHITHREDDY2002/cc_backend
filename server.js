const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const PORT = process.env.PORT || 4000;
const DB_NAME = "tutorial"

// routes
// var testAPIRouter = require("./routes/testAPI");
// var UserRouter = require("./routes/Users");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Set the MongoDB connection URI. Replace 'your_mongodb_connection_uri' with your actual MongoDB URI.
const mongoURI = 'mongodb+srv://kanchireddyvarshithreddy:B0ARMIvxmlZToidl@clove.qm4gool.mongodb.net/?retryWrites=true&w=majority';

// Set up Mongoose connection with options (including the useUnifiedTopology option).
const mongooseOptions = {
  useNewUrlParser: true, // Use the new URL parser.
  useUnifiedTopology: true,
  dbName:"tutorial" // Use the new server discovery and monitoring engine (deprecated warning).
};

// Connect to MongoDB
mongoose.connect(mongoURI, mongooseOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
// mongoose.connect("mongodb+srv://rohithreddyn013:mongodb1234@cluster1.2k2yl5o.mongodb.net/?retryWrites=true&w=majority",{ 
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         .then(()=>{
//             console.log("connection succesfull");
//         })
//         .catch((err)=>{
//             console.log("connection not succesfull"+err);
//         })

// setup API endpoints

var testAPIRouter = require("./routes/testAPI");
 var UserRouter = require("./routes/Users");
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
