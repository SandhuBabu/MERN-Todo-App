const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

// Connection string
const connectionString = "mongodb://localhost:27017/full_stack_todo";

// Connecting to MongoDB
const connectDB =  () => {
    mongoose.connect(connectionString)
    .then(()=>console.log('|---------------- DB Connected ----------------|\n\n'))
    .catch(err=>console.log('DB Connection Error'))
};

module.exports = connectDB;