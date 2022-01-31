import express from "express";
import like from "../controllers/like.js";
import auth from "../middlewares/auth.js";
import validId from "../middlewares/validId.js";
const router = express.Router();


router.post("/addLike/:_id", auth, validId, like.add);
router.get("/listLike", auth, like.list);


export default router;

