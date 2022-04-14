////////////////////////
// Setup - Import deps and create app object
////////////////////////
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 3001
const app = express()
const pokedex = require('./models/pokemon.js')
//////////////////////
// Declare Middleware
//////////////////////
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method')) 
app.use("/static", express.static('public'))
app.use(morgan('tiny'))
///////////////////////
// Declare Routes and Routers 
///////////////////////
// Index Route
app.get("/pokedex", (req, res) => {
    res.render('index.ejs', {pokedex: pokedex})
})
// New Route 
app.get("/pokedex/new", (req, res) => {
    res.render("new.ejs")
})
// Create Route
// Needs troublshooting as the form is not giving back readable data for my show route to display
app.post("/pokedex", (req, res) => {
    // minipulate data to reflect ejs show formatting
    // { misc: {abilities:}}
    pokedex.unshift(req.body)
    res.send(req.body)
})
// Edit Route
app.get("/pokedex/edit/:id", (req, res) => {
    res.render('edit.ejs')
})
// Update Route
// app.put("/pokedex/:id", (req, res) => {
//     pokedex[parseInt(req.params.id)] = req.body
//     res.redirect("/")
// })
// Delete Route
app.delete("/pokedex/:id", (req, res) => {
    pokedex.splice(req.params.id, 1)
    res.redirect("/")
})
// Show Route
app.get("/pokedex/:id", (req, res) => {
    const pokemon = pokedex[parseInt(req.params.id)]
    res.render("show.ejs", {pokemon})
})
///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, () => {
    console.log(`Kanto Radio channel ${PORT}`)
})