const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    const query = req.body.CityName;
    const appId = "f4bc399a08788347ee2117a785140bc6";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appId + "&units=metric"
    https.get(url, function(respons) {
        console.log(respons.statusCode);


        respons.on("data", function(data) {
            const weatherdata = JSON.parse(data)
            const decs = weatherdata.weather[0].description
            const temp = weatherdata.main.temp
            const icon = weatherdata.weather[0].icon;
            const imageUrl = "https://api.openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>the weather is  curently " + decs + " </p>");
            res.write("<h1>the temprature in " + query + " is " + temp + " degree celcius.</h1>");
            res.write("<img src=" + imageUrl + "   >");
            res.send();
        })
    })
    //

})


//


app.listen(3000, function() {
    console.log("port start on 3000");
})
