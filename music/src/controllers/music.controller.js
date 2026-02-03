import { uploadMusic, uploadImage } from "../services/storage.service.js"
import songModel from "../models/music.model.js"

export async function uploadMusicController(req, res){
    try {

        const { title } = req.body;
        const { fullName, userID } = req;

        const file = req.files;

        if(!title || title.trim() === ""){
            return res.status(400).json({
                message : "Title is required",
                success : false,
                error : true
            })
        }

        if(!file){
            return res.status(400).json({
                message : "No file uploaded",
                success : false,
                error : true
            })
        }

        const musicUrl = await uploadMusic(file.music[0]);
        const coverImageUrl = await uploadImage(file.coverImage[0]);


        await songModel.create({
            title : title,
            artist : fullName.firstName + " " + fullName.lastName,
            artistID : userID,
            musicURL : musicUrl.url,
            coverImageURL : coverImageUrl.url
        }).then((song) => {
            return res.status(201).json({
                message : "Music uploaded successfully",
                success : true,
                error : false,
                song : song
            })
        }).catch((error) => {
            return res.status(500).json({
                message : "Error creating song in database" + error.message || error,
                success : false,
                error : true
            })
        });

        
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error" + error.message || error,
            success : false,
            error : true
        })
    }
}

export async function getAllSongsController(req, res){
    try {

        const songs = await songModel.find({
            artistID : req.userID
        })

        return res.status(200).json({
            message : "Songs fetched successfully",
            success : true,
            error : false,
            songs : songs
        })
        
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error" + error.message || error,
            success : false,
            error : true
        })
    }
}