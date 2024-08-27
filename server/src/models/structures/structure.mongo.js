const mongoose = require('mongoose');


const structureSchema = new mongoose.Schema({
    structure: {
        type: Schema.Types.mixed,
        required: true,

    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },

})

module.exports = mongoose.model('Structures', structuresSchema);