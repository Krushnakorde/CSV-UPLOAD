/** ------------------ IMPORTING MONGOOSE ------------------ **/
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required:[true, "Upload CSV File"],
  }, 

  filepath:{
    type:String,
    required:true,

  },

  file:{
    type:String,
    required:true,
  },

  time: {
    type:Date,
    default:Date.now,
    options: { timeZone: 'Asia/Kolkata' }
  }
});




/** ------------------ MAKING MODEL ------------------ **/
export const fileModel = mongoose.model("File", fileSchema);

/** ------------------ EXPORTING MODEL ------------------ **/
