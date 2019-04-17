console.log('client side java script is loaded')

fetch('http://localhost:3000/weather?address=Chicago').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.erro)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
// '#' to signify id, '.' to signify a class
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = 'From JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchLocation = searchElement.value
    console.log(searchLocation)
    url = 'http://localhost:3000/weather?address=' + searchLocation

    message1.textContent = 'Loading...'
    message1.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
    weatherForm.reset()
})


