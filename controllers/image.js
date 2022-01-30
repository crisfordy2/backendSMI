import image from "../models/image.js";
import fs from "fs";
import path from "path";
import moment from "moment";

const add = async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.visibility)
        return res.status(400).send({ message: "Incomplete data" });

    let imageUrl = "";
    if (Object.keys(req.files).length === 0) {
        imageUrl = "";
    } else {
        if (req.files.image) {
            if (req.files.image.type != null) {
                const url = req.protocol + "://" + req.get("host") + "/";
                const serverImg =
                    "./uploads/" + moment().unix() + path.extname(req.files.image.path);
                fs.createReadStream(req.files.image.path).pipe(
                    fs.createWriteStream(serverImg)
                );
                imageUrl =
                    url +
                    "uploads/" +
                    moment().unix() +
                    path.extname(req.files.image.path);
            }
        }
    }

    const boardSchema = new image({
        name: req.body.name,
        description: req.body.description,
        url: imageUrl,
        visibility: req.body.visibility,
        userId: req.user._id,
    });

    const result = await boardSchema.save();
    if (!result) return res.status(400).send({ message: "Error registering task" });
    return res.status(200).send({ result });
}


const listImgs = async (req, res) => {
    const resultImg = await image.find({ userId: req.user._id })
    if (!resultImg) return res.status(400).send({ message: "the user dont have imgs" });
    return res.status(200).send({ resultImg });
}

const listAll = async (req, res) => {
    const resultImg = await image.find();
    if (!resultImg) return res.status(400).send({ message: "there aren't images" });
    return res.status(200).send({ resultImg });
}


const update = async (req, res) => {

    if (!req.body.name || !req.body.description || !req.body.visibility)
        return res.status(400).send({ message: "Incomplete data" });

    const exists = await image.findById({_id: req.body._id});
    if(!exists) return res.status(400).send({ message: "there isn't image" });

    const result = await image.findByIdAndUpdate(exists._id, {
        name: req.body.name,
        description: req.body.description,
        url: exists.url,
        visibility: req.body.visibility,
        userId: req.user._id,
    })

    return !result 
        ? res.status(400).send({message: "Error updating the img"})
        : res.status(200).send({result})
}


// Falta agregar lo de borrar la imagen de la carpeta uploads
const deleteImg = async (req, res) => {

    const exists = await image.findById({_id: req.params["id"]});
    if(!exists) return res.status(400).send({ message: "there isn't image" });

    const taskDelete = await image.findByIdAndDelete({_id: req.params["id"]});
    if(!taskDelete) return res.status(400).send({ message: "Error deleting img" });

    return res.status(200).send({message: "img deleting susesfully"});
}







export default {
    add,
    listImgs,
    listAll,
    update,
    deleteImg
}