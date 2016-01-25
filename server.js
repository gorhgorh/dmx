console.log('dmx v0.0.2');
var sp = require('./listen');
var static = require('node-static');
var file = new static.Server('./public');
var server = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
});
var io = require('socket.io')(server);
server.listen(8080);
console.log("open the url http://localhost:8080");
io.on('connection',function (socket) {
  console.log('someone connected',socket.id);

  socket.on('dmx:out', function (data) {
    console.log(data.msg);
    sp.write(data.msg+'\n');
  });
});