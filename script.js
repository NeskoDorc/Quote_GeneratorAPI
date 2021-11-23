// https://type.fit/api/quotes Api

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('qoute')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQouteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQouts = [];


//Show Loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true
}

//Hide Loading
function complete() {
    quoteContainer.hidden = false
    loader.hidden = true
}


// Show random qoute

function newQoute() {
    loading()
        // Pick randome Qoiute
    const qoute = apiQouts[Math.floor(Math.random() * apiQouts.length)]

    if (qoute.author === null) {

        authorText.textContent = "Unknown"

    } else {
        authorText.textContent = qoute.author

    }
    // ?check Qoute lenght to determine style 

    if (qoute.text.length > 50) {
        quoteText.classList.add('long-qoute')

    } else {

        quoteText.classList.remove('long-qoute')
    }



    quoteText.textContent = qoute.text

    complete()
}


// Get qoutes from API

async function getQuotes() {
    loading()
    const apiUrl = 'https://type.fit/api/quotes'
    try {
        const response = await fetch(apiUrl)
        apiQouts = await response.json()
        newQoute()

    } catch (err) {

        // Catch Error

    }


}

// Tweet Qoute
function tweetQoute() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank')
}


//Event Listeners

newQouteBtn.addEventListener('click', () => {
    getQuotes()
})

twitterBtn.addEventListener('click', () => {
    tweetQoute()
})

getQuotes()