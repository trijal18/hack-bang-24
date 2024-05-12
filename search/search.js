/* use async in method to use serach 
(async () => {
    try {
        const result = await search("cake", 20000);
        console.log(result);
    } catch (error) {
        console.error("Error occurred:", error);
    }
})();
check test.js for example
*/



import mongoose from "mongoose";
import dotenv from "dotenv";
import {getJson as getJson} from  "./modules/rand.cjs";
import {getAns as getAns} from "./gemi.js";

// Load environment variables from .env file
dotenv.config();

const MONGOURL = process.env.MONGO_URL;

mongoose.connect(/*MONGOURL*/"mongodb+srv://root:toor@cluster0.fbcjkmf.mongodb.net/").then(() => {
    console.log("Database connected successfully.");
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    specialization: String,
    rate: Number,
    working:Boolean,
    createdAt: String,
    updatedAt: String,
  });
// Create a Mongoose model called "UserModel" based on the userSchema
const UserModel = mongoose.model("users", userSchema);  

//const userData = await UserModel.find()

//console.log(userData);
async function searchRand(query,budget){
  const recivedJson=getJson(query,budget);
  const userData=await UserModel.find({$or: [{specialization:recivedJson.key[0].role, rate: { $lt:recivedJson.key[0].pay} },
    {specialization:recivedJson.key[1].role, rate: { $lt:recivedJson.key[1].pay} },
    {specialization:recivedJson.key[2].role, rate: { $lt:recivedJson.key[2].pay} },
    {specialization:recivedJson.key[3].role, rate: { $lt:recivedJson.key[3].pay} },]});
  //const userData=await UserModel.find();
  //const userData=await UserModel.find({specialization:recivedJson.key[0].role, rate: { $lt:recivedJson.key[0].pay} },);
  return userData;
  //return await UserModel.find();
}

async function searchGemi(query,budget){
  const recivedJson=await getAns(query,budget);
  const userData=await UserModel.find({$or: [{specialization:recivedJson.key[0].role, rate: { $lt:recivedJson.key[0].pay} },
    {specialization:recivedJson.key[1].role, rate: { $lt:recivedJson.key[1].pay} },
    {specialization:recivedJson.key[2].role, rate: { $lt:recivedJson.key[2].pay} },
    {specialization:recivedJson.key[3].role, rate: { $lt:recivedJson.key[3].pay} },]});
  //const userData=await UserModel.find();
  //const userData=await UserModel.find({specialization:recivedJson.key[0].role, rate: { $lt:recivedJson.key[0].pay} },);
  return userData;
}

async function search(query,budget){
  try{
    const recivedJson=await getAns(query,budget);
    const userData=await UserModel.find({$or: [{specialization:recivedJson.key[0].role, rate: { $lt:recivedJson.key[0].pay} },
      {specialization:recivedJson.key[1].role, rate: { $lt:recivedJson.key[1].pay} },
      {specialization:recivedJson.key[2].role, rate: { $lt:recivedJson.key[2].pay} },
      {specialization:recivedJson.key[3].role, rate: { $lt:recivedJson.key[3].pay} },]});
    //const userData=await UserModel.find();
    //const userData=await UserModel.find({specialization:recivedJson.key[0].role, rate: { $lt:recivedJson.key[0].pay} },);
    return userData;
  }
  catch(err) {
    const recivedJson=await getAns(query,budget);
    const userData=await UserModel.find({$or: [{specialization:recivedJson.key[0].role, rate: { $lt:recivedJson.key[0].pay} },
    {specialization:recivedJson.key[1].role, rate: { $lt:recivedJson.key[1].pay} },
    {specialization:recivedJson.key[2].role, rate: { $lt:recivedJson.key[2].pay} },
    {specialization:recivedJson.key[3].role, rate: { $lt:recivedJson.key[3].pay} },]});
  //const userData=await UserModel.find();
  //const userData=await UserModel.find({specialization:recivedJson.key[0].role, rate: { $lt:recivedJson.key[0].pay} },);
  return userData;
  }
}

async function addUser(fields) {
  try {
      const result = await UserModel.create({
          name: fields.name,
          email: fields.email,
          password: fields.password,
          specialization: fields.specialization,
          rate: fields.rate
      });

      console.log("User added:", result.insertedId);
      return result.insertedId; // Assuming you want to return the ID of the inserted user
  } catch (error) {
      console.error("Error adding user:", error);
      throw error;
  }
}

/*(async () => {
  try {
      const result = await searchGemi("cake", 20000);
      console.log(result);
  } catch (error) {
      console.error("Error occurred:", error);
  }
})();*/
async function connect(query,budget){
  //const recivedJson=getJson(query,budget);
  const userData=await UserModel.find({});
  //const userData=await UserModel.find();
  //const userData=await UserModel.find({specialization:recivedJson.key[0].role, rate: { $lt:recivedJson.key[0].pay} },);
  return userData;
  //return await UserModel.find();
}

export{
  searchGemi,
  searchRand,
  search,
  addUser,
  connect,
}

//console.log(search("cake",20000));
//search("cake",40000);

