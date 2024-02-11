/** ------------------ IMPORTING PACKAGE ------------------ **/
import express from "express"
import FileController from "../controller/file.controller.js";
import { uploadFile } from "../middleware/multer.config.js";
const router = express.Router();

/** ------------------ IMPORTING CONTROLLERS ------------------ **/

const fileController = new FileController();

// /** ------------------ MAKING ROUTES ------------------ **/

router.get("/", fileController.getFiles);
router.post("/upload", uploadFile.single('file'), fileController.fileUpload);

router.get("/view/:id", fileController.getSpecificFile);
router.get("/delete/:id", fileController.deleteFile);

export default router;


