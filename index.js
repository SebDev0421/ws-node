'use strict'

const WebSocket = require('ws').Server,
      express = require('express'),
      app = express(),
      morgan = require('morgan'),
      path = require('path')

const wss = new WebSocket({port:8080});

wss.on('connection',function connection(ws){
   ws.on('message',function(message){
       wss.broadcast(message)
   }) 
})


wss.broadcast = function broadcast(msg){
    wss.clients.forEach((client)=>{
        client.send(msg);
    })
}


setInterval(()=>{
    wss.clients.forEach((client)=>{
        client.send("Envia tu valor del sensor aca!!!!");
    })

    console.log("data was send sucefully!!!")
},1000)

app.set('port',8000);

app.use(express.static("public"));

app.use(express.static(__dirname ));

app.use(morgan('dev'));

app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/index.html`);
})


app.listen(app.get('port'),()=>{
    console.log('SERVER RUN ON',app.get('port'))
})