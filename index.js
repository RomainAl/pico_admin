const net = require('net');
const io = require('socket.io-client');
// const socket = io.connect("http://192.168.10.2:1337");
const socket = io.connect("https://pico-server-late-breeze-8245.fly.dev");
socket.emit("join", "Pico", true);

socket.on("mess", function (mess) {
    sendSock(mess);
    setTimeout(()=>{sendSock('No'+mess)}, 1000);
  });

function sendSock(mess){
    console.log(mess);
    let host;
    switch (mess[0]=="N"?mess[2]:mess[0]){
        case "A":
            host = "192.168.10.6";
            break;
        case "B":
            host = "192.168.10.7";
            break;
        case "C":
            host = "192.168.10.8";
            break;
        case "D":
            host = "192.168.10.9";
            break;
        default:
            console.log(`MyError01: ${mess[0]}`);
            break;
    }
    let client = net.createConnection(3000, host, () => {
        client.write((mess[0]=="N"?`NoVib${mess[mess.length-1]}`:`Vib${mess[mess.length-1]}`));
    });
    client.on("data", (data) => {
        console.log(`Received: ${data}`);
    });
    client.on("error", (error) => {
        console.log(`Error: ${error.message}`);
    });
}