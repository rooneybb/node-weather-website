const request = require('request')



const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/7325f0e7f077ebf08415e33b060b1abb/' + lat + ',' + long

    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            /*
            '{"timezone": "' + body.timezone + '",' +
            '"current_temp": "' + body.currently.temperature + '",' +
            '"weekly_summary": "' + body.daily.summary + '",' +
            '"today_summary": "' + body.daily.data[0].summary + '",' +
            '"today_min": "' + body.daily.data[0].temperatureMin + '",' + 
            '"today_max": "' + body.daily.data[0].temperatureMax + '"}'
            */
            const forecast_data = {
            "timezone": body.timezone,
            "current_temp": body.currently.temperature,
            "weekly_summary": body.daily.summary,
            "today_summary": body.daily.data[0].summary,
            "today_min":body.daily.data[0].temperatureMin,
            "today_max":body.daily.data[0].temperatureMax
            }
            callback(undefined, forecast_data)
        }

    })
}

module.exports = forecast