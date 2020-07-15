const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader');

// Show Loading
function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function hideLoading(){
    //if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
   // }
}

//get quote from API
async function getmyQuote(){
    showLoading();
    //API called from https://forismatic.com/en/api/ - 
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try { 
        // combininig the proxy url with apiUrl to get over the issue of CORS (browser's same origin policy)
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // Condition to check whether author is blank and add 'Unknown'
        if(data.quoteAuthor === ''){
            quoteAuthor.innerText='-Unknown';
        }   else{
            quoteAuthor.innerText=data.quoteAuthor;
        }
        //Reduce ong quotes for long quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add ('long-quote')
        } else {    
            quoteText.classList.remove ('long-quote')
        }
        quoteText.innerText = data.quoteText;
        hideLoading();
        console.log(data);          
    } catch (error) {
        // this is to ensure if the API gives error due to special characters, it runs t he function again to fetch the next quote
        getmyQuote();
        console.log('Eror fetching quote: ' , error);
    }
}

//Invoke the tweet function
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    // Open a new window
    window.open(twitterUrl, '_blank');
}

//Activating the button cllicks via Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getmyQuote);

//on load- i.e. when we load the page, the getQuote() function should be called
getmyQuote();
//showLoading();