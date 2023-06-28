import express, { json } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import helmet from "helmet"
import cors from "cors"
import mongoose from "mongoose"
import morgan from "morgan";

dotenv.config();
const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const SERVER_URL = process.env.SERVER_URL;

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use((request, response, next) => {
    request.headers.origin = request.headers.referer; // Set the origin header to the referer
    next();
  });
  
// MODIFY AT PROD, ONLY ALLOW CLIENT_URL TO CONNECT TO THIS API
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

app.use(express.static("public"))

app.get("/", (req, res) => {res.send("hello world")});

mongoose.connect(MONGOOSE_URL).then( () => {
    console.log("MONGOOSE CONNECTED");
    app.listen(PORT, () => {
        console.log("APP RUNNING ON: " + PORT)
    });
}).catch( (reason) => {
    console.log("MONGOOSE CONNECTION FAILED BECAUSE: " + reason)
})