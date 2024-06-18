const express=require('express');
const https=require('https');
const bodyParser=require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    
    res.sendFile(__dirname+"/index.html");
    
});


app.post("/",(req,res)=>{
    const cityName=req.body.cityName;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=d0c11bfef9710d0de6ac443ae2e8550f&units=metric";
    https.get(url,(response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const weatherData=JSON.parse(data);
            const icon=weatherData.weather[0].icon;
            const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>The weather is currently is "+weatherData.weather[0].description + "<p>");
            res.write("<h1>The current Temperature in " +weatherData.name+" is "+weatherData.main.temp +".</h1>");
            res.write("<img src="+imageURL +">");
            res.send();
        });
});
    console.log(req.body.cityName);
    console.log("POST");
});

app.listen(3000,()=>{
    console.log("Server is runing on port 3000");
});
