const { response } = require('express')

//Importar modelos
const Hurto = require('../models/hurto')


const hurtoGet = async (req, res = response) => {

    const hurtos = await Hurto.find()

    res.json({
        hurtos
    })
}

const hurtoPost = async (req, res = response) => {
    const body = req.body
    let mensaje = ''
    console.log(body)
    try {
        const hurto = new Hurto(body)
        await hurto.save()
        mensaje = "Exito en la insersion de hurtos"
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.log(Object.values(error.errors).map(val => val.message))
            mensaje = Object.values(error.errors).map(val => val.message)
        }
    }
    console.log(mensaje)
    res.json({
        msg: mensaje
    })
}

const hurtoPut = async (req, res = response) => {
    const { _id, direccion, latitud, longitud, descripcion } = req.body;
  
    try {
      const hurto = await Hurto.findByIdAndUpdate(_id, {
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion
      });
  
      if (hurto) {
        res.json({
          msg: "Hurto guardado exitosamente"
        });
      } else {
        res.status(404).json({
          error: "Hurto no encontrado"
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "Error al actualizar el hurto"
      });
    }
  };
  

const hurtoDelete = async (req, res = response) => {
    const {_id} = req.query
    let mensaje = " "
    try {
        const hurto = await Hurto.deleteOne({ _id: _id })
        mensaje = "Eliminado exitosamente de hurtos"
    } catch (error) {
        mensaje = "No eliminado, error"
    }
    console.log(mensaje)
    res.json({
        msg: mensaje
    })
}

module.exports = {
    hurtoGet,
    hurtoPost,
    hurtoPut,
    hurtoDelete
}