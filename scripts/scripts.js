document
  .querySelector("main #search .input form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    let input = document.querySelector("main #search .input form input").value;

    if (input !== "") {
      showMessageAlert("Carregando<span>.</span><span>.</span><span>.</span>");

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input
      )}&appid=7c3cbdf79b8457df3278e8e38b3727ba&units=metric&lang=pt_br`;

      let result = await fetch(url);
      let json = await result.json();

      if (json.cod === 200) {
        mountHTML({
          city: json.name,
          country: json.sys.country,
          temp: json.main.temp,
          tempMin: json.main.temp_min,
          tempMax: json.main.temp_max,
          tempLike: json.main.feels_like,
          pressure: json.main.pressure,
          humidity: json.main.humidity,
          speedWind: json.wind.speed,
          description: json.weather[0].description,
          icon: json.weather[0].icon,
        });
      } else {
        document.querySelector("main #content").style.display = "none";
        showMessageAlert("Localização não encontrada");
      }
    }
  });

function showMessageAlert(message) {
  document.querySelector("main #alert p").innerHTML = message;
}

function mountHTML(json) {
  let html = document.querySelector("main #content");
  showMessageAlert("");
  html.style.display = "flex";
  html.innerHTML = `
  <div class="left">
          <div class="message-time">
            <p>TEMPO AGORA EM</p>
            <div class="city">
              <img src="./assets/locate.svg" alt="" srcset="" />
              <h2>${json.city}, ${json.country}</h2>
            </div>
          </div>
          <div class="img-weather">
            <img src="./assets/${json.icon}.svg" alt="${json.description}" srcset="" />
            <p>${json.description}</p>
          </div>
        </div>
        <div class="right">
          <div class="infos">
            <div class="speed option" title="Velocidade do Vento">
              <img src="./assets/air.svg" alt="" srcset="" />
              <p>${json.speedWind}km/h</p>
            </div>
            <div class="humidity option" title="Umidade">
              <img src="./assets/water.svg" alt="" />
              <p>${json.humidity}%</p>
            </div>
            <div class="pressure option" title="Pressão">
              <img src="./assets/thermometer.svg" alt="" srcset="" />
              <p>${json.pressure}hPa</p>
            </div>
          </div>
          <div class="temperature">
            <div class="min-max">
              <div class="min" title="Temperatura Mínima">
                <img src="./assets/arrow-down.svg" alt="" srcset="" />
                <p>${json.tempMin}°</p>
              </div>
              <span>-</span>
              <div class="max" title="Temperatura Máxima">
                <img src="./assets/arrow-up.svg" alt="" srcset="" />
                <p>${json.tempMax}°</p>
              </div>
            </div>
            <div class="tempActual">
              <p>${json.temp}°C</p>
              <p>Sensação Térmica: ${json.tempLike}°</p>
            </div>
          </div>
        </div>
  `;
}
