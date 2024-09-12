import { mongoose } from "mongoose";


const structureSchema = new mongoose.Schema({
    _id: {
        type: String, 
        required: true,
    },
    structure: {
        type: mongoose.Schema.Types.Mixed,
        required: true,

    },
    timestamp: {
        type: Date,
        default: Date.now(),
        required: true,
    },

})

export const structuresDatabase = mongoose.model('masterStructure', structureSchema);

