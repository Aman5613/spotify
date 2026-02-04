import express from "express";
import multer from "multer";
import * as musicController from "../controllers/music.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

// api/music/...
router.get("/", authMiddleware.authUserMiddleware, musicController.getAllMusicController);

router.post("/upload",authMiddleware.artistAuthMiddleware,upload.fields([{ name: "music", maxCount: 1 },{ name: "coverImage", maxCount: 1 },]),musicController.uploadMusicController,);

router.get("/getArtistSongs", authMiddleware.artistAuthMiddleware, musicController.getAllSongsController);

router.post("/createPlaylist", authMiddleware.artistAuthMiddleware, musicController.createPlaylistController);

router.get("/getAllPlaylists", authMiddleware.authUserMiddleware, musicController.getAllPlaylistsController);

router.get("/getArtistPlaylist", authMiddleware.authUserMiddleware, musicController.getPlaylistsController)

router.get("/getPlaylist/:playlistID", authMiddleware.authUserMiddleware, musicController.getPlaylistbyIDController)

router.get("/getMusic/:musicID", authMiddleware.authUserMiddleware, musicController.getMusicbyIDController);



export default router;