import like from "../models/like.js";
import image from "../models/image.js";

const add = async(req, res)=>{

    const existImg = await image.findById({_id: req.params["_id"]});
    if(!existImg) return res.status(400).send("img invalid");

    const newLike = new like({
        userId: req.user._id,
        imageId: req.params["_id"]
    })

    const result = await newLike.save();

    return !result
        ? res.status(400).send("Error creating like")
        : res.status(200).send({result})
}


const list = async(req, res)=>{

    const listLikes = await like.find({userId: req.user._id}).populate('imageId');
    if(!listLikes) return res.status(400).send("the user don't have images")
    return res.status(200).send({listLikes})
}   


export default {
    add,
    list    
}