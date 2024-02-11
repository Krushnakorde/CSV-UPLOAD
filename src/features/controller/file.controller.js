import { createNewFile, deleteFile, getFiles, getSpecificFile } from "../repository/file.repository.js";

import fs from "fs";

import path from 'path';

import csvParser from "csv-parser";

export default class FileController{
    

async fileUpload(req, res, next){
    try{

        // file is not present

        if(! req.file){
            return res.status(400).send("No files were uploaded.");
        }
        // file is not csv()
        if(req.file.mimetype != "text/csv"){
            return res.status(400).send("Select CSV files only.")
        }
        console.log(req.file);
        const file = await createNewFile(req.file.originalname, req.file.path, req.file.filename);

        res.redirect("/")

    }catch(err){
        next(err);
    }
}


async getFiles (req, res, next){
    try{

        const files = await getFiles();

        res.render('home',{files:files, title:"HOME" } )       

    }catch(err){
        next(err);
    }
}


async getSpecificFile (req, res, next){
    try{
        const {id}=req.params;
        const csvfile = await getSpecificFile(id);

        // page

        const page =parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const startIndex = (page-1)*limit;
        const endIndex = page*limit;


        // csv configurations

       

        const bodyData=[];
        const header=[];
        fs.createReadStream(csvfile.filepath)
        .pipe(csvParser())
        .on("headers", (headers)=>{
            headers.map((head)=>{
                header.push(head);
            })
        })
        .on('data', (data)=>{
            bodyData.push(data)
        })
        .on('end', ()=>{
            console.log("Krushna")

            const results={};
    
            if(endIndex < bodyData.length){
                results.next={
                    page:page+1,
                    limit:limit
                }
            }

            if(startIndex > 0){
                results.previous ={
                    page:page-1,
                    limit:limit
                }
            }

            results.current={
                page:page,
                limit:limit,
            }

            results.result = bodyData.slice(startIndex, endIndex);

             // pagination
           console.log(results);

            res.render("filesView", {
                title: "file",
                fileName: csvfile.filename,
                head:header,
                data:results.result,
                length:results.result.length,
                results:results,
                id:id,
            })
            
        })     

    }catch(err){
        next(err);
    }

}








async deleteFile(req, res, next){

    try{
    console.log("hello");
    const {id}=req.params;
    console.log(id);
    

    const file =await deleteFile(id);

    return res.redirect("/");
    
    }catch(err){
        next(err);
    }
    
}

}




 

// /** ------------------ EXPORTING FUNCTION To open file viewer page ------------------ **/
// module.exports.view = async function(req, res) {
//     try {
//         // console.log(req.params);
//         let csvFile = await CSV.findOne({file: req.params.id});
//         // console.log(csvFile);
//         const results = [];
//         const header =[];
//         fs.createReadStream(csvFile.filePath) //seeting up the path for file upload
//         .pipe(csvParser())
//         .on('headers', (headers) => {
//             headers.map((head) => {
//                 header.push(head);
//             });
//             // console.log(header);
//         })
//         .on('data', (data) =>
//         results.push(data))
//         .on('end', () => {
//             // console.log(results.length);
//             // console.log(results);
//             res.render("file_viewer", {
//                 title: "File Viewer",
//                 fileName: csvFile.fileName,
//                 head: header,
//                 data: results,
//                 length: results.length
//             });
//         });


//     } catch (error) {
//         console.log('Error in fileController/view', error);
//         res.status(500).send('Internal server error');
//     }
// }

