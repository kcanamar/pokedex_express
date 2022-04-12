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
app.get("/", (req, res) => {
    res.render('index.ejs', {pokedex: pokedex})
})
// New Route 
app.get("/new", (req, res) => {
    res.render("new.ejs")
})
// Create Route
// Needs troublshooting as the form is not giving back readable data for my show route to display
app.post("/", (req, res) => {
    pokedex.unshift(req.body)
    res.redirect("/")
})
// Edit Route
app.get("/edit/:id", (req, res) => {
    res.send('this is the edit page')
})
// Update Route
// app.put("/:id", (req, res) => {
//     pokedex[parseInt(req.params.id)] = req.body
//     res.redirect("/")
// })
// Delete Route
app.delete("/:id", (req, res) => {
    pokedex.splice(req.params.id, 1)
    res.redirect("/")
})
// Show Route
app.get("/:id", (req, res) => {
    const pokemon = pokedex[parseInt(req.params.id)]
    res.render("show.ejs", {pokemon})
})
///////////////////////////
// Server Listener
///////////////////////////
app.listen(PORT, () => {
    console.log(`Kanto Radio channel ${PORT}`)
})