require('dotenv').config()//IMportat paquete
const Server = require('./models/server')

const server= new Server // intanciar el objeto
server.listen()