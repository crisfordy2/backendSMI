import express from "express";
import image from "../controllers/image.js"
import auth from "../middlewares/auth.js";
import validId from "../middlewares/validId.js";
import formatFile from "../middlewares/formatFile.js";
import multiparty from "connect-multiparty";
const mult = multiparty();
const router = express.Router();

router.post("/addImg", mult, formatFile, auth, image.add);
router.get("/listImgs", auth, image.listImgs);
router.get("/listAll", auth, image.listAll);
router.put("/updateImg", auth, image.update);
router.delete("/deleteImg/:_id", auth, validId, image.deleteImg);

export default router;
