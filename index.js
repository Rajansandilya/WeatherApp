const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempval, orgval)=>{
  let temparature = tempval.replace("{%tempvalue%}", orgval.main.temp);
   temparature = temparature.replace("{%tempmin%}", orgval.main.temp_min);
   temparature = temparature.replace("{%tempmax%}", orgval.main.temp_max);
   temparature = temparature.replace("{%location%}", orgval.name);
   temparature = temparature.replace("{%country%}", orgval.sys.country);
   temparature = temparature.replace("{%tempstatus%}", orgval.weather[0].main);
   return temparature;
};

const server = http.createServer((req, res) =>{
    if(req.url == "/"){
        requests('http://api.openweathermap.org/data/2.5/weather?q=Pune&appid=ac18c1f96a3b47360ad004981a34c353')
.on('data',  (chunk)=> {
    const objData = JSON.parse(chunk);
    const arrData = [objData]
 const realTimedata = arrData.map((val) =>
  replaceVal(homeFile, val)).join(" ");

//  res.write(realTimedata);
res.write(realTimedata);
console.log(realTimedata);
})
.on('end',  (err) =>{
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
    }
});
server.listen(8000, "127.0.0.1");