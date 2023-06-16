const { Schema, model } = require('mongoose');

const HurtoSchema = Schema({
    direccion: {
        type: String,
        required: [true, 'La dirección es requerida'],
    },

    latitud: {
        type: String,
        required: [true, 'La latitud es requerida'],
        validate: {
            validator: function (value) {
                // Validar rango de latitud
                const lat = parseFloat(value);
                return lat >= 6.13 && lat <= 6.217;
            },
            message: 'La latitud debe estar entre 6.13 y 6.217',
        },
    },
    
    longitud: {
        type: String,
        required: [true, 'La longitud es requerida'],
        validate: {
            validator: function (value) {
                // Validar rango de longitud
                const lon = parseFloat(value);
                return lon >= -75.567 && lon <= -75.34;
            },
            message: 'La longitud debe estar entre -75.567 y -75.34',
        },
    },

    descripcion: {
        type: String,
        required: [true, 'La descripción es requerida'],
    },

    fecha: {
        type: Date,
        required: [true, 'La fecha es requerida'],
        default: Date.now, 
        get: function (value) {
            return value.toISOString().split('T')[0]; 
        },
    },
});

module.exports = model('Hurto', HurtoSchema);
