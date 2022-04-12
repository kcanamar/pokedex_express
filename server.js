////////////////////////
// Setup - Import deps and create app object
////////////////////////
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const PORT = process.env.PORT || 3001
const app = express()
dotenv.config()
//////////////////////
// Declare Middleware
//////////////////////

///////////////////////
// Declare Routes and Routers 
///////////////////////

///////////////////////////
// Server Listener
///////////////////////////