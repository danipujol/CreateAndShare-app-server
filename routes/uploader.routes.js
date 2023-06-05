const router = require("express").Router()
const uploader = require("../middlewares/uploader")

router.post("/", uploader.single("image"), (req, res, next) => {

    if(!req.file) {
        next(new Error("No se encontró ninguna imagen"))
        return;
    }

    res.json({imageUrl: req.file.path}) 


})

module.exports= router

