
const express = require('express');
const app = express();

// app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
  // res.read("login.html");
  res.send('hellow')
});
app.listen(3000);

app.get('/messages', (req, res) => {
  return res.send("all your messages");
});

var Slack = require('slack-node');
apiToken = "xoxp-1505231510978-1490490972055-1529111559888-2ae9f60dd778219e203d1888b62d45a2";
slack = new Slack(apiToken);

app.get('/get', (req, res) => {
  let responseTest = getMessage();
  console.log("send to get");
  console.log(responseTest);
  return res.send(responseTest);
});

app.get('/post', (req, res) => {
  let responseTest = postMessage();
  console.log("send to post");
  console.log(responseTest);
  return res.send(responseTest);
});


function getMessage() {
  slack.api('conversations.history', {
    token: "xoxp-1505231510978-1490490972055-1529111559888-2ae9f60dd778219e203d1888b62d45a2",
    channel: 'C01F1BL1092'
  }, function (err, response) {
    console.log("get")
    console.log(response);
    console.log(console.error);
    return response;
  });
}

function postMessage() {
  slack.api('chat.postMessage', {
    text: 'hi Tovy!',
    channel: '#general'
  }, function (err, response) {
    console.log("post!")
    console.log(response);
    return response;
  });
}

