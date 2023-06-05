const router = require("express").Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const Artwork = require("../models/Artwork.model")
const ArtWork = require("../models/Artwork.model")
const Comments = require("../models/Comments.model")
const User = require("../models/User.model")

//todo: Todas las rutas de CRUD sobre las obras de arte


//POST:"/obra/crear" -> enviar a recibir del FE los detalles de una obra y crearla en la BD
  router.post("/crear", isAuthenticated, async (req, res, next) => {
    const {title, image, description, yearOfCreation, typeOfArt} = req.body
  try{
    
  await ArtWork.create({
    title,
    image,
    creator:  req.payload._id,
    description,
    yearOfCreation,
    typeOfArt,

  })
  res.json("Obra creada")
 // console.log(req.payload) // vemos que nos trae nuestro ID
  }catch(error){
    next(error)
  }
  })


 //GET: "/obras" -> enviar al FronEnd todas las obras (titulos y imagenes)
 router.get("/", async (req, res, next) => {
 try {
 const response = await ArtWork.find().sort({createdAt: 1}).limit(20) // estarian las ultimas 20 obras creadas en la vista
 //todo comprobar si creatAt: 1 es de la mas reciente a la mas antigua sino es -1
 // acabar de pulir si poner un .select
 res.json(response)

 } catch(error){
     next(error)
 }
 });



//GET: /obra/:obraId/detalles -> renderiza los detalles de las obras (relacionarlo con el modelo comentarios)
//con sus comentarios respectivos
router.get("/:id/detalles", async (req, res, next) => {

    const {id} = req.params 

    try{
        const artwork = await ArtWork.findById(id).populate("creator", "username") //aqui vemos las obras con el nombre del creador unicamente
        // .populate(Comments)

        // const comments = await Comments.find({artWorkComment: id})// podemos ver los comentarios de la obra de los usuarios
        // // console.log({response, Comments})

    res.json(artwork)

    }catch(error){
        next(error)
    }
})


//PUT: "/obra/:obraId/editar" -> recibir la info y actualizarla en la BD
router.put("/:obraId/editar", isAuthenticated, async (req, res, next) => {

    const {obraId} = req.params 
    const {title, image, description, yearOfCreation, typeOfArt} = req.body
    try{
 
        const response = await Artwork.findByIdAndUpdate(obraId, {
           title,
           image,
           description,
           yearOfCreation,
           typeOfArt,
           creator: req.payload._id

        })

        res.json("obra editada")

    }catch(error){
        next(error)
    }
})


//DELETE: "/obra/:obraId/eliminar" -> borrar una obra
router.delete("/:obraId/eliminar", isAuthenticated, async (req,res,next) =>{
const {obraId} = req.params;
   try{
await Artwork.findByIdAndDelete(obraId)
  res.json("obra eliminada")

   }catch(error){
    next(error)
   }

})




module.exports = router;