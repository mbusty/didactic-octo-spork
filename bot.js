var HTTPS = require('https');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      phrase1 = /^\/test$/;
      phrase2 = /^\/yeahbaby$/;
      phrase3 = /^\/okayyy$/;


  if(request.text && phrase1.test(request.text)) {
    this.res.writeHead(200);
    postMessage(1);
    this.res.end();
  }else if (request.text && phrase2.test(request.text)){
    this.res.writeHead(200);
    postMessage(2);
    this.res.end();
  }else if (request.text && phrase3.test(request.text)){
    this.res.writeHead(200);
    postMessage(3);
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

    botResponse = "yeet";
    //console.log(botResponse);
  }else if (num == 2){
    botResponse = "https://imgur.com/TkF45e9.gif";
  }else if (num == 3){
    botResponse = "https://imgur.com/183DLsI.gif";
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
