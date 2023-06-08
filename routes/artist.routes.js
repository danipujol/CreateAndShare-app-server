const router = require("express").Router();

const User = require("../models/User.model");
const Artwork = require("../models/Artwork.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

//GET: "/artistas" -> renderiza la lista de todos los artistas(usuarios registrados)
//todo falta (filtrar por los que tienen contenido)

router.get("/", async (req, res, next) => {
  
  try {
    const response = await User.find().limit(20).sort({createdAt: -1})
    .select({username: 1, name: 1, firstName: 1})
    //const oneArtwork = await Artwork.findOne({ creator: response._id })
    // .sort({ createdAt: -1 })
    // .select({ title: 1, image: 1 });
    console.log(response);
    //console.log(oneArtwork)
    res.json(response);
    // res.json({response, oneArtwork});

  } catch (error) {
    next(error);
  }
});

//GET:/artistas/:artistaId/detalles-> renderiza los detalles de un artista

router.get("/:artistaId/detalles", async (req, res, next) => {
  const { artistaId } = req.params;

  try {
    const response = await User.findById(artistaId); //Buscamos el artista
    const artWorks = await Artwork.find({ creator: artistaId }).limit(20).sort({createdAt: -1}); // Buscamos las obras del artista
    //console.log(response)
    res.json({ response, artWorks }); 
  } catch (error) {
    next(error);
  }
});

//GET: /artistas/mi-perfil
router.get("/mi-perfil", isAuthenticated, async (req, res, next) => {

const myId = req.payload._id 

  try{

    const response = await User.findById(myId)
    const artWorks = await Artwork.find({ creator: myId }).limit(20).sort({createdAt: -1})

    res.json({response, artWorks})

  }catch(error){
    next(error)
  }

})



//PUT: /artistas/:artistaId/editar-> para editar solo ID

router.put("/:artistaId/editar", async (req, res, next) => {
  const { username, actualCity } = req.body;
  const { artistaId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(artistaId, {
      username,
      actualCity,
    }); // estamos buscando el artista y actualizamos los datos que queremos
    res.json("perfil actualizado");
  } catch (error) {
    next(error);
  }
});

//DELETE: "/artistas/:artistaId/eliminar" -> elimina un artista por ID
router.delete("/:artistaId/eliminar", async (req, res, next) => {
  const { artistaId } = req.params;
  try {
    await User.findByIdAndDelete(artistaId);
    res.json("cuenta borrada");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
