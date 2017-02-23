// Import
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const uuid = require('node-uuid')
const appData = require('./data.json')

// Create app data (mimics a DB)
const userData = appData.users
const exclamationData = app.exclamations

function getUser(username) {
  const user = userData.find(u => u.username === username)
  return Object.assign({}, user)
}

// Create default port
const PORT = process.env.PORT || 3000

// Create a new server
const server = express()

// Configure server
server.use(bodyParser.json())
server.use(session({
  secret: process.env.SESSION_SECRET || 'awesomecookiesecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoSTore({
    url: process.env.MONGO_URL || 'monogodb://localhost/vue2-auth'
  })
}))
server.use(flash())
server.use(express.static('public'))
server.use(passport.initialize())
server.use(passport.session())
server.set('views', './views')
server.set('view engine', 'pug')
