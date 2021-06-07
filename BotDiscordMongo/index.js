//Librerias
const Discord = require("discord.js")
//Invocar token bot y conexión a DB
const config = require("./config.json")
const welcome = require('./welcome')
const client = new Discord.Client();
//Funciones Async
const axios = require('axios')
//Conexión con Mongo
const mongoose = require("mongoose");

getPokemon('charizard')


//Función para buscar Pokemon por su nombre 
async function getPokemon(name){
    try
    {
        const result = await axios.get(`https://api.pokemontcg.io/v1/cards?name=${name}`)
        const cards = result.data.cards;
        let output = '';
        for(let card of cards){
            output = `Nombre ${card.name} - ID ${card.id} Tipo ${card.types} Rareza ${card.rare}\n`;
        }
        return output;
    }
    catch(err){
        console.log(err);
    }
}

//Función para buscar Pokemon por su ID
async function showPokemon(id)
{
    try{
        const result = await axios.get(`https://api.pokemontcg.io/v1/cards?id=${id}`)
        const card = result.data.cards[0];
        let output = '';
        output += `${card.name} - ${card.subtype}\n`;
        output += `${card.imageUrl}`;
        return output;
    }
    catch(err){
        console.log(err);
    }
}

client.on('ready', () =>{
    console.log('Bot en linea');
});

client.on('message', async msg =>{
    if(msg.content.startsWith('!busca')){
        let command = msg.content.split(' ')[1];
        let output = await getPokemon(command);
        msg.reply(output);
    }
    else if
        (msg.content.startsWith('!ver'))
        {
            let command = msg.content.split(' ')[1];
            let output = await showPokemon(command);
            msg.reply(output);
        }
        else if(command === "!sum"){
            let command = args.map(x=> parseFloat(x));
            let sum = await command.reduce((counter, x) => counter += x);
            msg.reply(`La suma de los números ingresados es ${sum}!`)
        }
    
        else if(command === "info")
        {
            message.reply(`Proyecto Final de Programación!`)
            message.reply(`Desarrollado por: Anthony :D`)
        }
        else if (msg.content.startsWith('!setwelcome')){
            let command = msg.content(client, 'setwelcome', async msg =>{
                const {channel, content, guild} = msg
                let output = await mongo().then( async  (mongoose) =>{
                    try{
                        await new welcomeSchema({
                            _id: guild._id,
                            channelID: channel.id,
                            text: content,
                        }).save()
                    }
                    finally
                    {
                        mongoose.connection.close()
                    }
                })
            })
            
        }
});
//Conexión a MongoDB
mongoose.connect
    (config.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() =>{
        console.log("Conexión establecida DB");
    })
    .catch((err) =>{
        console.log(err);
    });
//Conexión al Bot    
client.login(config.BOT_TOKEN);