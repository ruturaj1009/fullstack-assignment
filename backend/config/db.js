const mongoose = require("mongoose");

const connectDB = async()=>{
  try{
      const conn =await  mongoose.connect(process.env.MONGO_URL);
      console.log(`connected to Database ${conn.connection.host}`); 
  }
  catch(e){
      console.log(`Error : ${e}`);
  }
}

module.exports = connectDB;