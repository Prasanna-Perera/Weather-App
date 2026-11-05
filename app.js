fetch("https://api.weatherapi.com/v1/forecast.json?key=f7ee12e0d9ec4b9d948105446261210&q=Colombo&days=7")
.then(response => response.json())
.then(data => {
    console.log(data);

  /*  document.getElementById("time").innerText = data.current.last_updated;
    document.getElementById("temp").innerText = data.current.temp_c;
    document.getElementById("current-text").innerText = data.current.condition.text;
    document.getElementById("img").innerHTML = `<img src="${data.current.condition.icon}">`;
*/
});