const apiKey = '3b78f4ab4114a31d360a6247114b814a'; 

function getWeatherForecast() {
    const city = document.getElementById('city').value; 
    
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fa&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fa&cnt=6&appid=${apiKey}`;
    
    fetch(currentUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert('Error ' + city);
                return;
            }
            const timestamp = data.dt;
            const date = new Date(timestamp * 1000); 
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = date.toLocaleDateString('fa-IR', options); 

            const currentCondition = data.weather[0].description;
            const currentTemp = data.main.temp;
            const currentHumidity = data.main.humidity;
            const currentWindSpeed = data.wind.speed;
            let currentIconFile = '';

            switch (currentCondition) {
                case 'آسمان صاف':
                    currentIconFile = 'sunny.png';
                    break;
                case 'ابرهای پارچه پارچه شده':
                    currentIconFile = 'p.png';
                    break;
                case 'بارش خفیف باران':
                    currentIconFile = 'heavyrain.png';
                    break;
                case 'پوشیده از ابر':
                    currentIconFile = 'cloud.png';
                    break;
                case 'کمی ابری':
                    currentIconFile = 'partlycloudy.png';
                    break;
                case 'ابرهای پراکنده':
                    currentIconFile = 'cloud.png';
                    break;
                    case 'مه و غبار':
                        currentIconFile = 'fog.png';
                        break;
                        case"ریز گرد":
                        currentIconFile = 'haze.png';
                        break;
                default:
                    currentIconFile = 'def.png';
            }

            const currentIconUrl = `images/weather-icons/${currentIconFile}`;

            const currentWeatherHtml = `
                <div class="current-weather">
                    <img src="${currentIconUrl}" alt="${currentCondition}" class="weather-icon">
                    <p class="date">${formattedDate}</p>
                    <p class="large-temp">${currentTemp} °</p>
                    <p>${currentHumidity}%  :رطوبت</p>
                    <p>${currentWindSpeed} m/s :باد</p>
                </div>
            `;
            document.getElementById('current-weather').innerHTML = currentWeatherHtml;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== "200") {
                alert('Error' + city);
                return;
            }

            const forecast = data.list.slice(1); 

            const forecastDetails = forecast.map(day => {
                const condition = day.weather[0].description;
                const temp = day.main.temp;
                const humidity = day.main.humidity;
                const windSpeed = day.wind.speed;
                let iconFile = '';

                switch (condition) {
                    case 'آسمان صاف':
                        iconFile = 'sunny.png';
                        break;
                    case 'ابرهای پارچه پارچه شده':
                        iconFile = 'p.png';
                        break;
                    case 'بارش خفیف باران':
                        iconFile = 'heavyrain.png';
                        break;
                    case 'پوشیده از ابر':
                        iconFile = 'cloud.png';
                        break;
                    case 'کمی ابری':
                        iconFile = 'partlycloudy.png';
                        break;
                    case 'ابرهای پراکنده':
                        iconFile = 'cloud.png';
                        break;
                        case 'مه و غبار':
                            currentIconFile = 'fog.png';
                            break;
                    default:
                        iconFile = 'def.png';
                }

                const iconUrl = `images/weather-icons/${iconFile}`;
                return `
                    <div class="forecast-item">
                        <img src="${iconUrl}" alt="${condition}" class="weather-icon">
                        <p class="large-temp">${temp} °</p>
                        <p>${humidity}%  :رطوبت</p>
                        <p>${windSpeed} m/s :باد</p>
                    </div>
                `;
            }).join('');

            document.getElementById('forecast-details').innerHTML = forecastDetails;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error ');
        });
}

window.onload = function() {
    document.getElementById('city').value = 'Tehran';  
    getWeatherForecast(); 
}
