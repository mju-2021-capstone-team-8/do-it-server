import { Router } from "express";

import fileUploader from "../../lib/fileUploader";
import * as gameCtrl from "./game.ctrl";

const game = Router();

game.get("/info", gameCtrl.info);
game.get("/audio-list", gameCtrl.audioList);
game.post("/upload", fileUploader, gameCtrl.upload);
game.post("/render-tempo", gameCtrl.renderTempo);

export default game;

