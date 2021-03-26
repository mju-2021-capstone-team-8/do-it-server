import { Router } from "express";

import * as gameCtrl from "./game.ctrl";

const game = Router();

game.get("/info", gameCtrl.info);

export default game;

