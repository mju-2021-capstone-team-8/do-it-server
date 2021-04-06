import { Router } from "express";

import * as gameCtrl from "./game.ctrl";

const game = Router();

game.get("/info", gameCtrl.info);
game.post("/render-tempo", gameCtrl.renderTempo);

export default game;

