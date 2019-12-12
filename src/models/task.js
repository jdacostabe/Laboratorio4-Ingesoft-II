const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Se crea un esquema para la base de datos, se hace un esquema por colección
//Es decir, que todos los JSON o documentos que se ingresen a la base de datos utilizando este esquema
//ingresarán como documentos de la misma colección

const TaskSchema = new Schema({
    title:String,
    description:String,
    status:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('task',TaskSchema);