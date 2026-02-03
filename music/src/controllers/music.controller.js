import { uploadMusic, uploadImage } from "../services/storage.service.js"
import songModel from "../models/music.model.js"

export async function uploadMusicController(req, res){
    try {

        const file = req.files;

        if(!file){
            return res.status(400).json({
                message : "No file uploaded",
                success : false,
                error : true
            })
        }

        // console.log(file);

        const musicUrl = await uploadMusic(file.music[0])
        const coverImageUrl = await uploadImage(file.image[0])

        console.log(musicUrl, coverImageUrl);
        

        // await songModel.create({
        //     title : req.body.title,
        //     artist : req.fullName,
        //     artistID : req.userID,
        //     musicURL : musicUrl.url,
        //     coverImageURL : coverImageUrl.url
        // }).then((song) => {
        //     return res.status(201).json({
        //         message : "Music uploaded successfully",
        //         success : true,
        //         error : false,
        //         song : song
        //     })
        // }).catch((error) => {
        //     console.error("Error creating song in database:", error);
        //     return res.status(500).json({
        //         message : "Error creating song in database",
        //         success : false,
        //         error : true
        //     })
        // });


        
    } catch (error) {
        return res.status(500).json({
            message : "Internal server error" + error.message || error,
            success : false,
            error : true
        })
    }
}