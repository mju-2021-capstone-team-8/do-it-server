import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import logger from "morgan";

import api from "./api";

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.use('/api', api);

const port = PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});

