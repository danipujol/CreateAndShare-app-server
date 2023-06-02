
const router = require("express").Router();

const Comments = require("../models/Comments.model");
const ArtWork = require("../models/Artwork.model");
const User = require("../models/User.model")

//GET: "/comentarios" ->listar los comentarios en las obras de arte 


//POST: "/comentario/crear" -> crear comentarios -> llamarlos a traver de btn submit


//todo. POST->para editar?


//DELETE: "/comentario/borrar" -> eliminar comentarios -> similar a crearlos pero borrando


module.exports = router;