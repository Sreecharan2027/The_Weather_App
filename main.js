// Function to fetch weather data using the OpenWeatherMap API
function fetchWeatherData(city) {
    const apiKey = '7ec6f9c77d0bed87cc80e937c6dfa1bf'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update temperature
            document.querySelector('.temp').textContent = `${data.main.temp.toFixed(0)}\u00B0`;

            // Update city name
            document.querySelector('.name').textContent = data.name;

            // Update weather condition
            document.querySelector('.condition').textContent = data.weather[0].main;

            // Update weather icon
            document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            // Update weather details
            document.querySelector('.cloud').textContent = `${data.clouds.all}%`;
            document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
            document.querySelector('.wind').textContent = `${data.wind.speed}km/h`;

            // Update background based on weather condition
            updateBackground(data.weather[0].main);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Event listener for the form submission
document.getElementById('locationInput').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = this.querySelector('.search').value;
    fetchWeatherData(city);
});

// Event listener for city links
document.querySelectorAll('.city').forEach(city => {
    city.addEventListener('click', function() {
        const cityName = this.dataset.city;
        fetchWeatherData(cityName);
    });
});

// Initial weather data for default city (London)
fetchWeatherData('kolkata');