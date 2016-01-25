#!/usr/bin/env node

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor

var repl = require("repl");

//A "local" node repl with a custom prompt
var local = repl.start("node::local> ");

var sp = new SerialPort("/dev/ttyACM0", {
  parser: serialport.parsers.readline("\n")
});
sp.on('open', function(){
  console.log('Serial Port Opened');
  sp.on('data', function(data){
      console.log(data);
  });

  sp.write('1c120w\n');

  local.context.sp = sp;
  local.context.w = writeDmx;
  console.log('serial port exported');
});


function writeDmx(val,chan,spt){
  if (!spt){spt = sp; }
  if (!chan){chan = 1; }
  var serLine = chan+ 'c' + val+"w\n";
  spt.write(serLine);
}
