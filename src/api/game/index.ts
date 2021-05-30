import { Router } from "express";

import fileUploader from "../../lib/fileUploader";
import * as gameCtrl from "./game.ctrl";

const game = Router();

game.get("/info", gameCtrl.info);
game.post("/render-tempo", fileUploader, gameCtrl.renderTempo);

export default game;

