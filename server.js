////////////////////////
// Setup - Import deps and create app object
////////////////////////
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 3001
const app = express()
const pokedex = require('./models/pokemon.js')
dotenv.config()
//////////////////////
// Declare Middleware
//////////////////////
app.use(methodOverride('_method')) 
app.use('/public', express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(morgan('tiny'))
///////////////////////
// Declare Routes and Routers 
///////////////////////
// Index Route
app.get("/", (req, res) => {
    res.send("Index, Main Page")
})
///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, () => {
    console.log(`Kanto Radio channel ${PORT}`)
})