import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import { register } from "./conntrollers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import userRoutes from "./routes/users.js"
import {createPost} from "./conntrollers/posts.js"
import postRoutes from "./routes/posts.js"
import Post from "./models/posts.js";
import User from "./models/User.js";
import { posts,users } from "./data/index.js";

/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//File Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//Routes with files
app.post("/auth/register",upload.single("picture"), register);
app.post("/posts", verifyToken,upload.single("picture"),createPost );

//Routes
app.use("/auth",authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


//MongoDb setup
const PORT = process.env.port || 5001;
const MONGO_URL = process.env.mongodb_url;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Serevr Port:${PORT}`));

    // UseMar.insertny(users);
    // Post.insertMany(posts);

  })
  .catch((error) => console.log(`${error} did not connect`));
