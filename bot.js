var HTTPS = require('https');
const request = require('request');
const cheerio = require('cheerio');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      phrase1 = /^\/uod$/;


  if(request.text && phrase1.test(request.text)) {
    this.res.writeHead(200);
    postMessage(1);
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage(num) {
  var botResponse, options, body, botReq;

    if(num == 1){
      // uod
      return new Promise(function (resolve, reject){
        request('https://vtcc-ros.github.io/POD-HTML.htm', (error, response, html) => {
    if (!error && response.statusCode == 200){
      const body = cheerio.load(html).text();
      var uod = parseuod(body);
      var date = parsedate(body);
      var finalstring = "The Uniform of the Day for " + date + " is " + uod;
      //conv.close(finalstring);
      console.log(finalstring);
      botResponse = finalstring;
      resolve();
    }
  });
  });
    //botResponse = "Ciaraan is the BIG gay.";
  }


  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function parseuod(uod) {
  var uodstring1 = uod.split('Uniform of the Day:')[1];
  var uodstring2 = uodstring1.split("<o")[0];
  return uodstring2;
}

function parsedate(date) {
  var month = ['January', 'February', 'March', 'April', 'May', 'August', 'September', 'October', 'November', 'Decemeber'];
  var year = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
  var dateparse1 = date.split('PLAN OF THE DAY')[1];
  var dateparse2 = dateparse1.split('VIRGINIA TECH')[0];
  var finalstring = "";
  for (i = 0; i < month.length; i++){
    for (j = 0; j < year.length; j++){
    if (dateparse2.indexOf(month[i]) >= 1){
      if (dateparse2.indexOf(year[j]) >= 1){
  	  var index = dateparse2.indexOf(month[i]);
      var start = index - 3;
      var end = dateparse2.indexOf(year[j]) + 4;
      finalstring = dateparse2.substring(start, end);
      }
      }
    }
  }
  return finalstring;
}

exports.respond = respond;
