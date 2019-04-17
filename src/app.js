const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

//define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//sets up handlebars engine
app.set('view engine', 'hbs') 
//if views is not in directory called 'views' need to specify directory
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brendan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Brendan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'This is here to help!',
        title: 'Help',
        name: 'Brendan'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please enter an address'
        })
    }

    geocode(req.query.address, (error, {lat, long, location} = {}) => {
        if (error){
            return res.send({ error })
        }

        forecast(lat, long, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     city: req.query.address,
    //     temp: 57
    // })
})


app.get('/help/*', (req, res) => {
    res.render('routeError', {
        title: 'Weather Error',
        name: 'Brendan',
        errorMessage: 'ERROR: 404: Help Article Not Found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('routeError', {
        title: 'Weather Error',
        name: 'Brendan',
        errorMessage: 'ERROR: 404: No Page Found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on Port 3000')
})