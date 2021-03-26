import Router from "express";

import auth from "./auth";
import game from "./game";

const api = Router();

api.use("/auth", auth);
api.use("/game", game);

export default api;

