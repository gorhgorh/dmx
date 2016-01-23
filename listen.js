
var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var sp = new SerialPort("COM3", {
  parser: serialport.parsers.readline("\n")
});
sp.on('open', function(){
  console.log('Serial Port Opened');
  sp.on('data', function(data){
      console.log(data);
  });


  sp.write('1c150w',function(err){
    if (err){throw err;}
    else {
      console.log("sent");
    }
  });
});
