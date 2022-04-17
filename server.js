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
    // What is a better way to do this?
    let newPokemon = {
        name: req.body.name,
        id: req.body.id,
        img: req.body.img
    }
    newPokemon.misc = {
        height: req.body.height, 
        weight: req.body.weight
    }
    newPokemon.stats = {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
        spattack: req.body.spattack,
        spdefense: req.body.spdefense,
        speed: req.body.speed
    }
    pokedex.unshift(newPokemon)
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
    let updatedPokemon = {...pokedex[req.params.id]};
    updatedPokemon.name = req.body.name;
    updatedPokemon.id = req.body.id;
    updatedPokemon.img = req.body.img;
    updatedPokemon.misc = {
        height: req.body.height, 
        weight: req.body.weight
    }
    updatedPokemon.stats = {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
        spattack: req.body.spattack,
        spdefense: req.body.spdefense,
        speed: req.body.speed
    }
    pokedex[req.params.id] = updatedPokemon
    console.log(pokedex[req.params.id])
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