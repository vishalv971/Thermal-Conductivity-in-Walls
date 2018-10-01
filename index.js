

/**
 * This is a small example app to turn off and on
 * the built-in LED of an arduino by data sent
 * from the browser with socket.io.
 */

'use strict';

// Initialize application constants
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const ab2str = require('arraybuffer-to-string')
const port = process.env.PORT || 3000;

const SerialPort = require('serialport');
//const SerialPort = serialport.SerialPort;

const serial = new SerialPort('COM3', {
    baudRate: 9600,
    parser: SerialPort.parsers.byteLength(1)
});

// Values to send over to Arduino.
const HIGH = Buffer.from([1]);
const LOW = Buffer.from([0]);

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


/* ===========================================
*
* Setup a simple server.
*
=========================================== */

app.get('/', (req, res) => {
    res.render('home');
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});

/* ===========================================
*
*  Socket.io stuff
*
=========================================== */

io.on('connection', (socket) => {
    console.log('a user connected');

    /**
     * Socket listener to determine whether or not to send HIGH / LOW
     * values to Arduino.
     */
    socket.on('message', (msg) => {
        console.log('Message received: ', msg);
        switch (msg) {
            case '1':
                serial.write(HIGH);
                break;
            case '2':
                serial.write(HIGH);
                break;
            default:
                break;
        }
    });
});

/* ===========================================
*
* Serialport stuff
*
=========================================== */

serial.on('open', () => {
    console.log('Port is open!');
});

/**
 * EventListener to receive data from .ino script uploaded to Arduino.
 *
 */
var message = [];
var arr = [];
var messag1;
serial.on('data', (data) => {
    //let message;
    process.stdout.write(data.toString("utf8"));
    message = data.toString("utf8");
    arr.push(data.toString("utf8"));
    io.sockets.emit('new message', message);
});
//console.log(messag1);
serial.on('close', () => {
    console.log('Serial port disconnected.');
    io.sockets.emit('close');
});


var k = {
    "Wood": 0.08,
    "Brick": 0.6,
    "Concrete": 0.8,
    "Glass": 0.8
}, k_value, kt;

var R_value, a = 0.000091, tDiff = 0.0, d, lambda = 0.0, t1, t2;

app.post("/calculate", function(req, res) {
    kt = req.body.k;
    k_value = k[req.body.k];
    d = parseFloat(req.body.d);

    t1 = arr[0] + arr[1] + arr[2] + arr[3] + arr[4];
    t2 = arr[7] + arr[8] + arr[9] + arr[10] + arr[11];
    tDiff = Math.abs(parseFloat(t1) - parseFloat(t2));
    console.log(tDiff);

    lambda = (k_value * a * tDiff)/d;
    console.log(lambda);

    R_value = d/lambda;
    console.log(R_value);

    //res.redirect({d: d, lambda: lambda, k: req.body.k, a: a, tDiff: tDiff, r: R_value},"/calculate1");

    res.redirect("/calculate");
});

app.get("/calculate", function(req, res) {
    res.render("value.ejs", {d: d, lambda: lambda, k: kt, a: a, tDiff: tDiff, r: R_value});
});
