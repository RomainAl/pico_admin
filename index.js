import { io } from "socket.io-client";

const socket = io.connect("http://192.168.10.2:1337");
// const socket = io.connect("https://pico-server-late-breeze-8245.fly.dev");
const admininfo = document.getElementById("admininfo");
socket.emit("join", "Pico", false);
socket.on("mess", function (mess) {
  console.log(mess);
  admininfo.innerText = mess + "\n" + admininfo;
});
