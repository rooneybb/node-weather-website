console.log('client side java script is loaded')



const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
// '#' to signify id, '.' to signify a class
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 'Please enter a location to retrieve its weather forecast'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchLocation = searchElement.value
    console.log(searchLocation)
    url = '/weather?address=' + searchLocation

    message1.textContent = 'Loading...'
    message1.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                const forecastData = JSON.stringify(data.forecast)
                //data.forecast.current_temp
                message2.textContent = forecastData
            }
        })
    })
    weatherForm.reset()
})


