import server from "./index.js";
import { connectToMongoose } from "./src/features/middleware/mongoose.config.js";

const port =8000;
server.listen(port, async ()=>{
    console.log("server is ported on 8000");
    await connectToMongoose()
})   