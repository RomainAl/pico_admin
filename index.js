const net = require('net');
const io = require('socket.io-client');
const socket = io.connect("https://mypicoserv-unuojesj3q-od.a.run.app");
socket.emit("join", "Pico", true);

const host = "192.168.10.4";

socket.on("mess", function (mess) {
    sendSock(mess);
    setTimeout(()=>{sendSock('No'+mess)}, 1000);
  });

function sendSock(mess){
    console.log(mess);
    //console.log('answer received and sent to Pico');
    let client = net.createConnection(3000, host, () => {
        //console.log("Connected");
        client.write(mess);
    });
    client.on("data", (data) => {
        //console.log(`Received: ${data}`);
    });
    client.on("error", (error) => {
        console.log(`Error: ${error.message}`);
    });
    client.on("close", () => {
        //console.log("Connection closed");
    });
}