import express from "express";
import multer from "multer";
import * as musicController from "../controllers/music.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post(
  "/upload",
  authMiddleware.artistAuthMiddleware,
  upload.fields([
    { name: "music", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  musicController.uploadMusicController,
);



export default router;