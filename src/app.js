const morgan = require('morgan');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Connecting to db

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/prueba',  {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log("La conexión a la base de datos se ha realizado correctamente")
    }).catch(err => console.log(err));

//importing routes

/*----------Se llama el archivo index.js de la carpeta routes----------*/
const indexRoutes = require('./routes/index.js');


//settings

/*----------Se utiliza el puerto que pone el navegador----------*/

app.set('port', process.env.PORT || 3000);

/*----------Indicar donde se encuantra la carpeta views (Donde está la presentación de la página)----------*/

app.set('views', path.join(__dirname + '/views'));

/*----------Indica motor de vista----------*/

app.set('view engine', 'ejs');





//middlewares - Se ejecutan antes de que lleguen a las rutas del servidor desde el cliente

/*----------Para ver como esta el proceso de ida y vuelta Cliente-Servidor----------*/

app.use(morgan('dev'));

/*----------Entender los datos que envía un formulario (Del cliente al servidor)----------*/

app.use(express.urlencoded({extended: false})); //Extended false porque es informacion liviana

/*----------s----------*/




//Routes

app.use('/', indexRoutes);

//starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})