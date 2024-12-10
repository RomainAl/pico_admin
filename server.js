const net = require("net");
const io = require("socket.io-client");
const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const socket = io.connect("http://192.168.10.2:1337");
// const socket = io.connect("https://pico-server-late-breeze-8245.fly.dev");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, "index.js"),
    // },
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

socket.emit("join", "Pico", true);

socket.on("mess", function (mess) {
  sendSock(mess);
  setTimeout(() => {
    sendSock("No" + mess);
  }, 1000);
});

function sendSock(mess) {
  console.log(mess);
  const host = hostSel(mess);
  let client = net.createConnection(3000, host, () => {
    client.write(mess[0] == "N" ? `NoVib${mess[mess.length - 1]}` : `Vib${mess[mess.length - 1]}`);
  });
  client.on("data", (data) => {
    console.log(`Received: ${data}`);
    socket.emit("picomess", `Pico mess: ${data}`);
  });
  client.on("error", (error) => {
    console.log(`Error: ${error.message}`);
  });
}

sendSockRandom(10);
function sendSockRandom(param) {
  t = ["B"]; //["A", "B", "C", "D"];
  setInterval(() => {
    for (let i = 0; i < t.length; i++) {
      for (let j = 0; j < 5; j++) {
        let r = Math.round(Math.random() * (param - 1));
        if (r == 0) {
          mess = `${t[i]}${j + 1}`;
          sendSock2(mess);
        }
      }
    }
  }, 1000);
}

function sendSock2(mess) {
  sendSock(mess);
  setTimeout(() => {
    sendSock("No" + mess);
  }, 1000);
}
function hostSel(mess) {
  let host;
  switch (mess[0] == "N" ? mess[2] : mess[0]) {
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
  return host;
}
