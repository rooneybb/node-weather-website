const request = require('request')


// const url = 'https://api.darksky.net/forecast/7325f0e7f077ebf08415e33b060b1abb/41.8781,-87.6298'

// request({ url: url, json: true}, (error, response) => {

//     if(error){
//         console.log('Unable to connect to weather service')
//     } else if (response.body.error) {
//             console.log('Unable to find location')
//     } else {
//         console.log('Timezone: ' + response.body.timezone)
//         console.log('Weekly Summary: ' + response.body.daily.summary)
//         console.log('Current Summary: ' + response.body.currently.summary)
//         console.log('Current Temp: ' + response.body.currently.temperature)
//         console.log('Current Precip: ' + response.body.currently.precipProbability + '%')
//     }
    
// })

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/7325f0e7f077ebf08415e33b060b1abb/' + lat + ',' + long

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'Timezone: ' + body.timezone + '\n' +
            'Current Temp: ' + body.currently.temperature + '\n' +
            'Weekly Summary: ' + body.daily.summary          
            )
        }

    })
}

module.exports = forecast