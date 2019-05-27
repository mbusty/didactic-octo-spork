var HTTPS = require('https');
//var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      phrase1 = /^\/ciaraan$/;
      phrase2 = /^\/thot$/;
      phrase3 = /^\/penis$/;
      phrase4 = /^\/meow$/;
      phrase5 = /^\/serenade me$/;


  if(request.text && phrase1.test(request.text)) {
    this.res.writeHead(200);
    postMessage(1);
    this.res.end();
  } else if (request.text && phrase2.test(request.text)) {
    this.res.writeHead(200);
    postMessage(2);
    this.res.end();
  }
  else if (request.text && phrase3.test(request.text)) {
    this.res.writeHead(200);
    postMessage(3);
    this.res.end();
  }
  else if (request.text && phrase4.test(request.text)) {
    this.res.writeHead(200);
    postMessage(4);
    this.res.end();
  }
  else if (request.text && phrase5.test(request.text)) {
    this.res.writeHead(200);
    postMessage(5);
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
    botResponse = "Ciaraan is the BIG gay.";
  } else if (num == 2) {
    botResponse = "All women are queens!"
  } else if (num == 3) {
    botResponse = "8===========D"
  } else if (num == 4) {
    botResponse = "https://www.youtube.com/watch?v=kvxCU_lQwKM"
  } else if (num == 5) {
    botResponse = "https://open.spotify.com/playlist/4R3S1skuC8p1saAA1EUvnG"
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


exports.respond = respond;
