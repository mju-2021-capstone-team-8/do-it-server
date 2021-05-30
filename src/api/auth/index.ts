import { Router } from "express";

import * as authCtrl from "./auth.ctrl";

const auth = Router();

auth.get("/info", authCtrl.info);
auth.post("/register", authCtrl.register);
auth.post("/login", authCtrl.login);
auth.post("/oa", authCtrl.loginOAuth);
auth.patch("/edit", authCtrl.edit);
auth.delete("/unregister", authCtrl.unregister);

export default auth;

