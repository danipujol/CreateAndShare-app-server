const {Schema, model} = require('mongoose');

const artworkSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        image: String,
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        description: String,
        yearOfCreation: {
           type: Number 
        },
        typeOfArt: {
            type: String,
            enum: [
                "pintura",
                "grafitis",
                "murales",
                "escultura", 
                "dibujo",
                "grabado",
                "arteDelVidrio",
                "orfebrería",
                "ebanistería",
                "cerámica",
                "fotografía",
                "otros"
            ],

        },
       
    },
    {
        timestamps: true
    }
   
)

const Artwork = model('Artwork', artworkSchema);

module.exports = Artwork;
