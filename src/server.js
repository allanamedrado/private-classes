const express = require('express')
const nunjucks = require('nunjucks')
const routes = require("./routes")
const methodOverride = require('method-override')

const server = express()

server.use(express.urlencoded({extended: true}))
server.use(methodOverride('_method'))
server.use(express.static('public'))
server.use(routes)


server.set("view engine", "njk")

nunjucks.configure("src/views", {
    express:server,
    autoescape:false,
    noCache: true
})

server.listen(3000, function() {
    console.log("server is running")
})