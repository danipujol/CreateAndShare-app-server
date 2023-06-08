
const router = require("express").Router();

const Comments = require("../models/Comments.model");
const ArtWork = require("../models/Artwork.model");
const User = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated");


//POST: "/comentario/crear" -> crear comentarios -> llamarlos a traver de btn submit

router.post("/crear/:artworkId", isAuthenticated, async (req, res, next) => {

    const{ opinion} = req.body
    const {artworkId} = req.params 
   const artistId = req.payload._id
try{

    await Comments.create({
           // se puedan crear comentarios sobre las obras de arte
    //solo para usuario registrado y loggeado
    artWorkComment: artworkId,
    userComment: artistId ,
    opinion,
 
    })


    res.json("comentario añadido")
}catch(error){
    next(error)
}
})

//GET: "/comentarios" ->listar los comentarios en las obras de arte 
//en teoria lo tenemos hecho en la ruta de obra/detalles

router.get("/:artworkId/comentarios", async (req, res, next) => {

const {artworkId} = req.params

try {

const comment = await Comments.find({artWorkComment: artworkId}).limit(10).sort({createdAt: -1})
res.json(comment)

}catch(error){
    next(error)
}

})


//todo. POST->para editar?
//de momento solo eliminar comentario y crear




//DELETE: "/comentario/borrar" -> eliminar comentarios -> similar a crearlos pero borrando

router.delete("/:commentId/eliminar", isAuthenticated, async(req, res, next) => {
    const {commentId} = req.params
    try{
res.json("comentario borrado")
    }catch(error){
        next(error)
    }
})

module.exports = router;