const mongo = require('./index')
const command  =  require('./index')
const mongoose = require('mongoose')
const welcomeSchema = require('./welcome-schema')

module.exports =(client) =>{
//!welcome 

    command(client, 'setwelcome', async message =>{
        const {member, channel, content, guild} = message
        if(!member.hasPermissions('ADMINISTRATOR'))
        {
            channel.send('You do not have permissions to run this command')
            return
        }
        await mongo().then( async  (mongoose) =>{
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

