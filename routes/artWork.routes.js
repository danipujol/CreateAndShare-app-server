const router = require("express").Router()
const ArtWork = require("../models/Artwork.model")
const User = require("../models/User.model")

//todo: Todas las rutas de CRUD sobre las obras de arte





//POST:"/obra/crear" -> enviar a recibir del FE los detalles de una obra y crearla en la BD
  router.get("/crear", async (req, res, next) => {
  try{
    
  await ArtWork.create({
    title: req.body.name,
    //image?
    // creator: ,
    description: req.body.desciption,
    yearOfCreation: req.body.yearOfCreation,
    // typeOfArt: req.body.typeOfArt

  })
  res.redirect("/:artistaId/detalles")
  }catch(error){
    next(error)
  }
  })






 //GET: "/obras" -> enviar al FronEnd todas las obras (titulos y imagenes)
//  router.get("/obras", async (req, res, next) => {
//  try {
//  const response = await ArtWork.find().select({ title: 1, image: 1})
//  res.json(response)

//  } catch(error){
//      next(error)
//  }
//  });





//GET: /obras/:obraId/detalles -> renderiza los detalles de las obras (relacionarlo con el modelo comentarios)


//GET: "/obra/:obraId/editr" -> renderizar formulario de edit


//PUT: "/obra/:obraId/edit" -> recibir la info y actualizarla en la BD


//DELETE: "/obra/:obraId/eliminar" -> borrar una obra




module.exports = router;