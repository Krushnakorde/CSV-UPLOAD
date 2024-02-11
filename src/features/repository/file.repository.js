import ApplicationError from "../middleware/ApplicationError.js";
import { fileModel } from "./fileSchema.js";
 "./fileSchema.js";

export async function createNewFile(filename, filepath, file){

    const newfile = new fileModel({filename, filepath, file});

    const savedFile = newfile.save();

    if(!savedFile){
        throw ApplicationError(400, 'Failed to send File');
    }

    return savedFile;

}




export async function getFiles (){
    const files  = await fileModel.find();
    if(!files){
        throw new ApplicationError(400, 'Failed to Get Files');
    }
    return files;
    
}


export async function getSpecificFile(id){
    console.log(id);
    const file= await fileModel.findById(id);
    if(!file){
        throw new ApplicationError(400), 'Failed to get file'
    }
    return file;
}



export async function deleteFile(id){
    const file = await fileModel.findByIdAndDelete(id);
    if(!file){
        throw new ApplicationError(400, "Failed to delete File")
    }

    return file;
}
