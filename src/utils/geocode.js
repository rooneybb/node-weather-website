const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1Ijoicm9vbmV5YmIyIiwiYSI6ImNqdG1oMGtqbjBsa3M0NXBrdGtndTh5ZHAifQ.gjcqD9MQkask1e_c2AWwQA'

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location, please try another search', undefined)
        } else {
            callback(undefined, {
                long: body.features[0].center[0],
                lat: body.features[0].center[1],
                location: body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode