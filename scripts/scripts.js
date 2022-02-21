document
  .querySelector("main #search .input form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    let input = document.querySelector("main #search .input form input").value;
    let keyApi = "7c3cbdf79b8457df3278e8e38b3727ba";

    if (input !== "") {
      showMessageAlert("Carregando<span>.</span><span>.</span><span>.</span>");

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input
      )}&appid=${keyApi}&units=metric&lang=pt_br`;

      let result = await fetch(url);
      let json = await result.json();

      if (json.cod === 200) {
        document.querySelector("main").style.height = "100%";
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
        document.querySelector("main").style.height = "100vh";
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
  html.style.display = "inline-block";
  html.innerHTML = `
  <div class="main">
  <div class="text">
    <h2 class="city" title="Cidade ${json.city}">${json.city}, ${
    json.country
  }</h2>
    <p class="temperature" title="Temperatura atual de ${
      json.city
    }">${json.temp.toFixed(0)}°</p>
    <div class="type" title="Clima ${json.description}">
      <p>${json.description}</p>
    </div>
  </div>

  <div class="image">
    <img src="./assets/${json.icon}.svg" alt="${json.description}" title="${
    json.description
  }" />
  </div>
</div>

<div class="footer">
  <div class="infos">
    <div class="humidity card" title="Umidade do Ar">
      <img src="./assets/water.svg" alt="Umidade do Ar" />
      <span class="humidityValue">${json.humidity}%</span>
    </div>
    <div class="pressure card" title="Pressão Atmosférica">
      <img src="./assets/pressure.svg" alt="Pressão Atual em hPa" />
      <span class="pressureValue">${json.pressure}hPa</span>
    </div>
    <div class="wind card" title="Velocidade do Vento">
      <img src="./assets/wind.svg" alt="Velocidade do Vento" />
      <span class="windValue">${json.speedWind}km/h</span>
    </div>
  </div>
  <div class="temperatureInfo">
    <div class="minMax">
      <img
        src="./assets/min-max.svg"
        alt="Temperatura Mínima e Máxima"
        title="Temperatura Mínima e Máxima"
      />
      <span class="minTemperatureValue" title="Temperatura Mínima"
        >Mínima de ${json.tempMin.toFixed(0)}°</span
      >
      <span>-</span>
      <span class="maxTemperatureValue" title="Temperatura Máxima"
        >Máxima de ${json.tempMax.toFixed(0)}°</span
      >
    </div>
    <div
      class="sensitiveTemperature"
      title="Sensação Térmica de ${json.city}"
    >
      <p>Sensação Térmica de ${json.tempLike.toFixed(0)}°</p>
    </div>
  </div>
</div>
  `;
}
