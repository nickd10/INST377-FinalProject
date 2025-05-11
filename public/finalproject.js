async function fetchCryptoData() {
    const apiUrl = 'https://rest.coincap.io/v3/assets?apiKey=bb43ba35d08f73b83e2fad9dd11097ebc46fa5a9a270d641d89ee7eeb6e67769';
    const response = await fetch(apiUrl);
    const { data } = await response.json();
    const list = document.getElementById('crypto-ticker');

    // Clear existing items
    list.innerHTML = '';

    // Add the top 10 cryptos as list items
    data.slice(0, 10).forEach(c => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="crypto">
                <h3>${c.name} (${c.symbol})</h3>
                <p>Price: $${(+c.priceUsd).toFixed(2)}</p>
                <p>Change (24h): ${(+c.changePercent24Hr).toFixed(2)}%</p>
            </div>
        `;
        list.appendChild(li);
    });

    // Initialize the carousel ticker
    $('#crypto-ticker').carouselTicker({
        speed: 0.05,
        direction: 'down',
        duplicated: true,
        pauseOnHover: true
    });
}
async function newsData() {
    const apiUrl = 'https://newsdata.io/api/1/news'
                 + '?apikey=pub_86155875b19a71ad6c93c5b5c5f50a53a22de'
                 + '&language=en';
  
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log(data.results);
  }

async function displayNews() {
    const newsContainer = document.getElementById('news-container');
    const apiUrl = 'https://newsapi.org/v2/everything?q=Cryptocurrency performance&apiKey=c48df870dd7440b1ae2b38d09bcda843';

    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Limit to the first 5 articles
    data.articles.slice(0, 5).forEach((article) => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');
            articleElement.innerHTML = `
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
            `;
            newsContainer.appendChild(articleElement);
    });
}
  

window.onload = () => {
    fetchCryptoData();
    newsData();
    displayNews();
};