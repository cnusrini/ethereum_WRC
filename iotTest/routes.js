var express = require('express')
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });
}

app.get("/", function(req, res) {

    var body = {
      infoTemperature,
      infoHumidity,
      infoCup,
      infoBrewing,
      infoMaintenance,
    }
    res.status(200).send(body);
  });


app.post("/postname", (req,res)=>{
  console.log(req.body);
 res.status(200).send('from app.post')
})
var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

module.exports = appRouter;
