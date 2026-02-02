import mongoose, { mongo } from "mongoose"

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    fullName : {
        firstName : { type : String, required : true},
        lastName : { type : String}
    },
    password  :{
        type : String,
        required : function() {
            return !this.googleId;
        },
    },
    googleId : {
        type : String,
        unique : true,
        sparse : true, // allows multiple null values
    },
    role : {
        type : String,
        enum : ['user', 'artist'],
        default : 'user'
    }

},{
    timestamps : true
}
)

const userModel = mongoose.model('User', userSchema)

export default userModel;