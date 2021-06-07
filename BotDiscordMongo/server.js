const express = require('express');
const bodyParser = require('body-parser')
const app = express();

//Hadlers Body Parser
app.use(bodyParser.urlencoded({extended:true}))

//Handlers


app.listen(3000, function()
{
    console.log('Servidor en el puerto 3000');
})

//GET
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.js')
    })

    app.post('/', (req, res) =>
    {
        console.log("Probando sonido");
    })

console.log('Si la conexión quieres hacer, al servidor te debes conectar');