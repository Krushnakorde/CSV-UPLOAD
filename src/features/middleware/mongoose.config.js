/** ------------------ IMPORTING PACKAGE ------------------ **/
import mongoose from "mongoose";


/** ------------------ MAKING CONNECTION ------------------ **/

const DB = 'mongodb://127.0.0.1:27017/CSV'

// mongoose configurations

export const connectToMongoose=async () => {

    try{
       await mongoose.connect(DB)

        console.log("connected to Mongoose");

    }catch(err){
            console.log(err);
    }
}

