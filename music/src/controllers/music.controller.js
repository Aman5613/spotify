import { uploadMusic, uploadImage } from "../services/storage.service.js";
import songModel from "../models/music.model.js";
import playlistModel from "../models/playlist.model.js";

export async function uploadMusicController(req, res) {
  try {
    const { title } = req.body;
    const { fullName, userID } = req;

    const file = req.files;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
        success: false,
        error: true,
      });
    }

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded",
        success: false,
        error: true,
      });
    }

    const musicUrl = await uploadMusic(file.music[0]);
    const coverImageUrl = await uploadImage(file.coverImage[0]);

    await songModel
      .create({
        title: title,
        artist: fullName.firstName + " " + fullName.lastName,
        artistID: userID,
        musicURL: musicUrl.url,
        coverImageURL: coverImageUrl.url,
      })
      .then((song) => {
        return res.status(201).json({
          message: "Music uploaded successfully",
          success: true,
          error: false,
          song: song,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Error creating song in database" + error.message || error,
          success: false,
          error: true,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error" + error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function getAllSongsController(req, res) {
  try {
    const songs = await songModel.find({
      artistID: req.userID,
    });

    return res.status(200).json({
      message: "Songs fetched successfully",
      success: true,
      error: false,
      songs: songs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error" + error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function createPlaylistController(req, res) {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "No data provided",
        success: false,
        error: true,
      });
    }

    const { title, songs } = req.body;
    const { fullName, userID } = req;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
        success: false,
        error: true,
      });
    }
    // create playlist
    await playlistModel
      .create({
        title: title,
        artist: fullName.firstName + " " + fullName.lastName,
        artistID: userID,
        songs: songs || [],
      })
      .then((playlist) => {
        return res.status(201).json({
          message: "Playlist created successfully",
          success: true,
          error: false,
          playlist: playlist,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message:
            "Error creating playlist in database" + error.message || error,
          success: false,
          error: true,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error " + error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function getPlaylistsController(req, res) {
  try {
    const playlists = await playlistModel.find({ artistID: req.userID });

    return res.status(200).json({
      message: "Playlists fetched successfully",
      success: true,
      error: false,
      playlists: playlists,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error " + error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function getAllMusicController(req, res) {
  try {
    const { skip = 0, limit = 10 } = req.query;

    const musicList = await songModel
      .find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    return res.status(200).json({
      message: "Music fetched successfully",
      success: true,
      error: false,
      music: musicList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error " + error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function getPlaylistbyIDController(req, res) {
  try {
    const { playlistID } = req.params;

    if (!playlistID) {
      return res.status(400).json({
        message: "Playlist ID is required",
        success: false,
        error: true,
      });
    }
    const playlist = await playlistModel
      .findOne({ _id: playlistID })
      .populate("songs");

    return res.status(200).json({
      message: "Playlist fetched successfully",
      success: true,
      error: false,
      playlist: playlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error " + error.message || error,
      success: false,
      error: true,
    });
  }
}

export async function getMusicbyIDController(req, res) {
    try {
        const { musicID } = req.params;

        if (!musicID) {
            return res.status(400).json({
                message : "Music ID is required",
                success : false,
                error : true
            })
        }
        const music = await songModel.findOne({ _id : musicID });

        return res.status(200).json({
            message : "Music fetched successfully",
            success : true,
            error : false,
            music : music
        });
        
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error " + error.message || error,
            success : false,
            error : true
        })
    }
}

export async function getAllPlaylistsController(req, res) {
    try {

        const playlists = await playlistModel.find({});

        return res.status(200).json({
            message : "Playlists fetched successfully",
            success : true,
            error : false,
            playlists : playlists
        });
        
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error " + error.message || error,
            success : false,
            error : true
        })
    }
}