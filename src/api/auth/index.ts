import { Router } from "express";

import * as authCtrl from "./auth.ctrl";

const auth = Router();

auth.post("/login", authCtrl.login);

export default auth;

