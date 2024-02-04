import { Router } from "express";
import { createUser, sendAlertMessage } from "../controller/voiceController";

const router: Router = Router();

router.route("/create-user").post(createUser);
router.route("/send-alert-message").post(sendAlertMessage);
export default router;
