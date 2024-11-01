const mongoose=require('mongoose')
const postSchema=new mongoose.Schema(
    {
        id:{
            type:String,
            required:true,
            unique:true,

        },
        content:{
            type:String,
            required:true
        },
        image:{
            type: image,
            required:false,
        },
        likes:{
            type: Number,
            default:0,
        },
        comment:{
            type: Array,
            default:[],
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },

    }
)