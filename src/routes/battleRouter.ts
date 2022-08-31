import { Router } from "express";
import battleValidate from "../middlewares/battleValidate.js";
import battleService from "../services/battleService.js";
import battleController from "../controllers/battleController.js";

const router = Router();

router.post("/battle", battleValidate, battleService, battleController);

export default router;