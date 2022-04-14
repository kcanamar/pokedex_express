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
app.post("/pokedex", (req, res) => {
    // What is a better way to do this? would it be writing a function in the app.js then exporting it here instead of hard coding?
    req.body.misc = {
        height: req.body.height, 
        weight: req.body.weight
    }
    req.body.stats = {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
        spattack: req.body.spattack,
        spdefense: req.body.spdefense,
        speed: req.body.speed
    }
    pokedex.unshift(req.body)
    res.redirect("/pokedex")
})
// Edit Route
app.get("/pokedex/edit/:id", (req, res) => {
    const pokemon = pokedex[parseInt(req.params.id)]
    res.render('edit.ejs', {
        pokemon: pokemon,
        index: req.params.id
    })
})

// Update Route
app.put("/pokedex/:id", (req, res) => {
    req.body.misc = {
        height: req.body.height, 
        weight: req.body.weight
    }
    req.body.stats = {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
        spattack: req.body.spattack,
        spdefense: req.body.spdefense,
        speed: req.body.speed
    }
    pokedex[parseInt(req.params.id)] = req.body
    res.redirect("/pokedex")
})

// Delete Route
app.delete("/pokedex/:id", (req, res) => {
    pokedex.splice(req.params.id, 1)
    res.redirect("/pokedex")
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