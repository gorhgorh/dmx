
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var sp = new SerialPort("/dev/ttyACM0", {
  parser: serialport.parsers.readline("\n")
});
sp.on('open', function(){
  console.log('Serial Port Opened');
  sp.on('data', function(data){
      console.log(data);
  });
});

module.exports = sp;