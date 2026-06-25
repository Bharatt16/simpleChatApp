import { db } from "./db/index.js";
import { users } from "./db/schema.js";
import "dotenv/config"
import  express  from "express";
import { createServer } from "node:http"
import { Server } from "socket.io"
import  path from "path"

import { initializeSocket } from "./socket.js";

const app = express();

app.use(express.static(path.resolve("./public")))

app.get("/", (req , res)=>{
    res.send("Chat server is running top-notch")
})

const httpServer = createServer(app);

const io = new Server(httpServer , {
    cors : {
        origin : "*",
    },
});

initializeSocket(io);

const PORT = process.env.PORT || 3000

httpServer.listen(PORT , ()=>{
    //  console.log(`Server is running on PORT ${PORT}`)
})
