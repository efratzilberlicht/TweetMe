const bodyParser = require('body-parser')
const express = require('express')
const path = require('path');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var Slack = require('slack-node');
const { strict } = require('assert');
const { text } = require('body-parser');
const { response } = require('express');
var slack;
var apiToken = "";
var channelName = "";
var channelId = "";

app.listen(5000);

//save the slack details from the user and rote to his slack 
app.post('/slackMe',function(req, res) {
     apiToken = req.body.token;
     channelName = req.body.channelName;
     channelId = req.body.channelId;
     slack = new Slack(apiToken); 
     res.sendFile(__dirname +'/public/chat.html');
  }
);

//get all the massages from the user's slack
app.get('/getMyMessages', (req, res) => {
  slack = new Slack(apiToken); 
  slack.api('conversations.history', {
    token: apiToken,
    channel: channelId,
  }, function (err, response) {
   return res.send(response); 
  });
});

//send the massages to the user's slack
app.post('/sendMyMessages', function(req, res) {
 let myMessageText = req.body.value;
 slack = new Slack(apiToken); 
 slack.api('chat.postMessage', {
      text: myMessageText,
      channel: channelName,
    }, function (err, response) {
      return res.send(response);
    });
});

