document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cryptoForm');
    const message = document.getElementById('formMessage');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = document.getElementById('username').value.trim();
      const crypto = document.getElementById('crypto').value.trim();
  
      const response = await fetch('/add-favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, crypto })
      });
  
      const result = await response.json();
      if (response.ok) {
        message.textContent = 'Favorite added successfully!';
        form.reset();
      } else {
        message.textContent = `Error: ${result.error}`;
      }
    });
  });
  
  
  
  
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
  
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("favorites-form");
    const chartsContainer = document.getElementById("charts-container");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value.trim();
      const crypto = document.getElementById("crypto").value.trim().toLowerCase();
  
      // Add to Supabase
      await fetch("/add-favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, crypto })
      });
  
      // Fetch price history and draw chart
      displayCryptoChart(crypto);
    });
  
    async function displayCryptoChart(symbol) {
      const url = `https://api.coincap.io/v2/assets/${symbol}/history?interval=d1`;
      const response = await fetch(url);
      const { data } = await response.json();
  
      const labels = data.map(entry => new Date(entry.date).toLocaleDateString());
      const prices = data.map(entry => parseFloat(entry.priceUsd));
  
      const canvas = document.createElement("canvas");
      chartsContainer.appendChild(canvas);
  
      new Chart(canvas.getContext("2d"), {
        type: "line",
        data: {
          labels,
          datasets: [{
            label: `${symbol.toUpperCase()} Price (USD)`,
            data: prices,
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: false }
          }
        }
      });
    }
  });
  
  
  window.onload = () => {
    fetchCryptoData();
    newsData();
    displayNews();
  };