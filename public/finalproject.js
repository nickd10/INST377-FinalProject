async function addUserInfo() {
  await fetch('/user', {
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

async function fetchCryptoHistory(cryptoName) {

  
  
  const apiKey = '90c6bd0234a74016e49b2b9d2968ab089fb71c22ac5021e6081cb6d5db085883';
  const url = `https://rest.coincap.io/v3/assets/${cryptoName}/history?interval=d1`;
  

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });

  const result = await response.json();
  console.log(result.data);

  createHistoryChart(result.data);
  
}


function createHistoryChart(data) {
  const labels = data.map(d => new Date(d.time).toLocaleDateString());
  const prices = data.map(d => parseFloat(d.priceUsd));

  const ctx = document.getElementById('crypto-chart').getContext('2d');

 
  if (window.cryptoChart) {
    window.cryptoChart.destroy();
  }

  window.cryptoChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: `${document.getElementById('crypto-input').value} Price (USD)`,
        data: prices,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 1,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true }
      },
      scales: {
        x: { title: { display: true, text: 'Date' } },
        y: { 
          title: { display: true, text: 'Price (USD)' },
          beginAtZero: false
        }
      }
    }
  });
}



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
  const usernameInput = document.getElementById('username-input').value.trim();

  fetch('/users')
    .then((result) => result.json())
    .then(resultJson => {
      console.log(resultJson);

      const existingTable = document.getElementById('user-table');
      if (existingTable) {
        existingTable.remove();
      }

      const table = document.createElement('table');
      table.setAttribute('id', 'user-table');

      const tableRow = document.createElement('tr');

      const tableHeadingUserName = document.createElement('th');
      tableHeadingUserName.innerText = 'Username';
      tableRow.appendChild(tableHeadingUserName);

      const tableHeadingCrypto = document.createElement('th');
      tableHeadingCrypto.innerText = 'Crypto Search History';
      tableRow.appendChild(tableHeadingCrypto);

      table.appendChild(tableRow);

      document.body.appendChild(table);

      // Filter users by the entered username (case-insensitive)
      const filteredUsers = resultJson.filter(user => 
        user.username && user.username.toLowerCase() === usernameInput.toLowerCase()
      );

      filteredUsers.forEach((user) => {
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
  
  async function displayNews() {
    const newsContainer = document.getElementById('news-container');
    const apiUrl = 'https://cryptopanic.com/api/v1/posts/?auth_token=11d472ee2b7e288b3f2de383b819c603f8e9ccff&public=true';
  
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    console.log(data.results); // now logs the array you want
  
    // clear out any old articles
    newsContainer.innerHTML = '';
  
    data.results.forEach((post) => {
      const articleElement = document.createElement('div');
      articleElement.classList.add('article');
      articleElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.excerpt || ''}</p>
        <a href="${post.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(articleElement);
    });
  }
  

  

window.onload = async function () {
    const path = window.location.pathname;

    if (path.includes("home.html")) {
        await fetchCryptoData();
        await displayNews();
    }

    if (path.includes("function.html")) {
        await loadUserData();
        await fetchCryptoHistory();
    } 
};