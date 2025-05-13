async function createUser() {
    await fetch(`/user`, {
        method: 'POST',
        body: JSON.stringify({
            username: `${document.getElementById('username-input').value}`,
            crypto: `${document.getElementById('crypto-input').value}`,
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then((result) => result.json());

    await loadUserData();
}


async function loadUserData() {
    console.log("Loading user data...");
    fetch('/users')
        .then((result) => result.json())
        
        .then(resultJson => {
            console.log(resultJson);
            const table = document.createElement('table');
            table.setAttribute('id', 'user-table');

            const tableRow = document.createElement('tr');

            const tableHeadingUserName = document.createElement('th');
            tableHeadingUserName.innerText = 'Username';
            tableRow.appendChild(tableHeadingUserName);

            const tableHeadingCrypto = document.createElement('th');
            tableHeadingCrypto.innerText = 'Crypto';
            tableRow.appendChild(tableHeadingCrypto);
            
            table.appendChild(tableRow);

            document.body.appendChild(table);

            resultJson.forEach((user) => {
                const tableRow = document.createElement('tr');
                const tableDataUserName = document.createElement('td');
                tableDataUserName.innerText = user.username;
                tableRow.appendChild(tableDataUserName);

                const tableDataCrypto = document.createElement('td');
                tableDataCrypto.innerText = user.crypto;
                tableRow.appendChild(tableDataCrypto);

                table.appendChild(tableRow);
            });
        });



}
  
  
  
  async function fetchCryptoData() {
    const apiUrl = 'https://rest.coincap.io/v3/assets?apiKey=90c6bd0234a74016e49b2b9d2968ab089fb71c22ac5021e6081cb6d5db085883';
    const response = await fetch(apiUrl);
    const { data } = await response.json();
  
    const wrapper = document.getElementById('crypto-ticker');
    wrapper.innerHTML = '';
  
    data.forEach(c => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <h3>${c.name} (${c.symbol})</h3>
        <p>Price: $${(+c.priceUsd).toFixed(2)}</p>
        <p>Change (24h): ${(+c.changePercent24Hr).toFixed(2)}%</p>
      `;
      wrapper.appendChild(slide);
    });
  
    new Swiper('.sidebar-swiper', {
      direction: 'vertical',
      slidesPerView: 4,
      spaceBetween: 10,
      loop: true,
      speed: 3000, // slow transition speed
      autoplay: {
        delay: 0, // no delay between transitions
        disableOnInteraction: false
      },
      freeMode: true,
      freeModeMomentum: false
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
  

  

window.onload = async function () {
    const path = window.location.pathname;

    if (path.includes("home.html")) {
        await fetchCryptoData();
        await newsData();
        await displayNews();
    }

    if (path.includes("function.html")) {
        await loadUserData();
    } 
};