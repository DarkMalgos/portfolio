const express =     require('express'),
      app =         express(),
      server = require('http').createServer(app),
      port = 1337

app.use('/css', express.static('assets/css'));
app.use('/js', express.static('assets/js'));
app.use('/img', express.static('assets/img'));
app.use('/fonts', express.static('assets/fonts'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
})

server.listen(port);
console.log("application live on port " + port);