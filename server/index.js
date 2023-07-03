import express, { json } from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import helmet from "helmet"
import cors from "cors"
import mongoose from "mongoose"
import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";
import mainRoutes from "./routes/mainRoutes.js"

dotenv.config();
const PORT = process.env.PORT;
const MONGOOSE_URL = process.env.MONGOOSE_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const SERVER_URL = process.env.SERVER_URL;

const app = express();
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))

// MODIFY AT PROD, ONLY ALLOW CLIENT_URL TO CONNECT TO THIS API
app.use(cors());

app.use(express.static("public"))

app.use("/API/auth", authRoutes);
app.use("/API/", mainRoutes);

mongoose.connect(MONGOOSE_URL).then( () => {
    console.log("MONGOOSE CONNECTED");
    app.listen(PORT, () => {
        console.log("APP RUNNING ON: " + PORT)
    });
}).catch( (reason) => {
    console.log("MONGOOSE CONNECTION FAILED BECAUSE: " + reason)
})