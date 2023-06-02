const router = require("express").Router();

const User = require("../models/User.model");
const Artwork = require("../models/Artwork.model");
const isAuthenticated = require("../middlewares/isAuthenticated");



//GET: "/artistas" -> renderiza la lista de todos los artistas(usuarios registrados) 
//todo  (filtrar por los que tienen contenido)

router.get("/", async (req, res, next) => {
    try{
  const response = await User.find().select({username: 1})
  // console.log(response)
  res.json(response)

    } catch(error){
        next(error)
    }
})


//GET:/artistas/:artistaId/detalles-> renderiza los detalles de un artista 

router.get("/:artistaId/detalles", async (req, res, next) => {
  const {artistaId} = req.params;

try{
const response = await User.findById(artistaId)
console.log(response)
res.json(response)

}catch(error){
  next(error)
}
})

//GET: /artistas/:artistaId/edit-> para editar solo  para el usuario logeado (ID) 

//  router.get("/:artistaId/edit", isAuthenticated, async (req, res, next) => {


//  })


//PUT: /artistas/:artistaId/edit-> para editar solo ID

// router.put("/:artistaId/edit", async (req, res, next) => {



// })





//DELETE: "/artistas/:artistaId/eliminar" -> elimina un artista por ID
router.delete("/:artistaId/eliminar", async (req, res, next) => {
  const {artistaId} = req.params
  try{
    await User.findByIdAndDelete(artistaId)
    res.json("cuenta borrada")

  }catch(error){
    next(error)
  }
})





module.exports = router;