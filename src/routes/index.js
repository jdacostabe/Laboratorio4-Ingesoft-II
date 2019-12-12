const express = require('express');
const router = express.Router();

//Se importan el esquema de la base de datos definido en el archivo task.js
//el '..' es para devolverse una carpeta
const Task = require('../models/task');

//Cuando se utilice este archivo, se devuelve lo que está en la función, que
//en este caso es la renderización de una vista (Escrita en HTML) (No hay que importarla, solo se da el nombre del archivo)
//Ya se sabe que es un .ejs porque se indicó el motor de plantillas ejs en app.js
router.get('/',async (req,res) => {
    //Se traen los datos de la base de datos que pertencen a esta colección
    //(Es asíncrono))
    const tasks = await Task.find();
    //Se renderiza la página web y se le pasan los datos que se quieren imprimir (Se le pasa el arreglo de doucmentos)
    res.render('index', {
        tasks //== tasks: tasks
    });
});


//Este método se activa con el envio de un POST del navegador, y lo que hace es guardar en la base de datos
//lo que se ingreso en los campos: Título y descripción
//Se le indica Async para decir que hay funciones dentro del método que son asincronas
router.post('/add',async (req,res)=>{
    //El modelo contiene dos campos: Status e id (de MongoDB)
    //Al pasarle lo que envía la página web, le ingresa al modelo también estos valores
    //De esta forma obtenemos un JSON con todos los datos. Lo cual es el objeto que se almacena en la base de datos
    const task = new Task(req.body);
    console.log(task);
    //Al decirle await, la aplicación no continúa hasta que se halla ejecutado la función (Esto solo sirve si se usa Async en la promesa)
    await task.save();
    //Cuando se guardan los datos, se redirecciona a la página inicial (Se recarga la página en la que está)
    res.redirect('/');
});

//Se le indica la ruta, y el ':' se usa para indicar un parametro que se le pasará en la ruta 
router.get('/delete/:id', async (req,res)=>{
    //Los que le pasa el index.ejs a este método es un objeto, y ya que vamos a borrar los elementos por su id
    //extraemos este y lo guardamos en una variable
    const {id} = req.params;
    //Se utiliza la función remove() pasándole el/los valor/es por el cual se va a buscar en la base de datos, y los valores que del/ de los documento/s a eliminar
    await Task.remove({_id:id});
    //Se redirecciona a la página inicial para que se recarguen los datos
    res.redirect('/');
})

//Método que se llama cuando se le quiere cambiar al botón para saber si una tarea ya se hizo o no
//Se cambia el status del documento (JSON)
router.get('/change/:id', async (req, res)=>{
    const {id} = req.params;
    //Se buscar el documento (O tarea) en la base de datos
    const task = await Task.findById(id);
    //Se edita el campo correspondiente en el documento que se obtuvo anteriormente 
    task.status = !task.status;
    //Se guardan los cambios que se hicieron al documento
    await task.save();
    //Se redirecciona a la página inicial para que se recarguen los datos
    res.redirect('/');
})

//Método que se llama cuando se quiere editar una tarea
router.get('/edit/:id', async (req,res)=>{
    const {id} = req.params;
    //Se buscar el documento (O tarea) en la base de datos
    const task = await Task.findById(id);
    res.render('edit', {task});
})

router.post('/update/:id', async (req,res)=>{
    const {id} = req.params;
    //Se le inidica el docuemtno a actualizar por medio del campo id, y se le ingresar el nuevo documento, el cual es aquiel que envia el formulario cuando se llama este método (Por lo que es un método POST, no un método GET)
    await Task.update({_id:id}, req.body);
    res.redirect('/');
})



//Se exporta la variable router
module.exports = router;